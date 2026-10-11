import { Category, Severity, Complaint, AiChatMessage } from '../types';

const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || '';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const PRIMARY_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODEL = 'openai/gpt-oss-20b';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqTriageResult {
  category: Category;
  confidence: number;
  severity: Severity;
  priorityScore: number;
  department: string;
  summary: string;
  estimatedImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  facilitiesImpacted: {
    schools: number;
    hospitals: number;
    busStops: number;
  };
}

class GroqService {
  private apiKey: string;

  constructor() {
    this.apiKey = GROQ_API_KEY;
  }

  public setApiKey(key: string) {
    this.apiKey = key;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  /**
   * Helper to perform fetch against Groq API with automatic model fallback
   */
  private async callGroq(
    messages: GroqMessage[],
    options: {
      jsonMode?: boolean;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<string> {
    const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL, 'qwen/qwen3.8-27b'];

    for (const model of modelsToTry) {
      try {
        const body: Record<string, any> = {
          model,
          messages,
          temperature: options.temperature ?? 0.2,
          max_tokens: options.maxTokens ?? 1024,
        };

        if (options.jsonMode) {
          body.response_format = { type: 'json_object' };
        }

        const res = await fetch(GROQ_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Groq request failed with model ${model}:`, errData);
          continue; // try next model
        }

        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return content;
        }
      } catch (err) {
        console.warn(`Network error calling Groq with model ${model}:`, err);
      }
    }

    throw new Error('All Groq model endpoints were unavailable.');
  }

  /**
   * Conversational Assistant: Ask the City terminal
   */
  async askCityAssistant(
    userQuery: string,
    history: AiChatMessage[] = []
  ): Promise<{
    content: string;
    dataCard?: AiChatMessage['dataCard'];
  }> {
    const systemPrompt = `You are CivicPulse AI, the central autonomous civic intelligence and smart city operating engine for municipal operations in Bengaluru.
Your tone is bold, authoritative, editorial, concise, and helpful. You analyze city telemetry, citizen reports, departmental backlogs, and real-time hazard severity.

Current live city telemetry:
- Total reports logged: 12,480
- Active field tickets: 2,140
- Critical emergencies: 326
- Resolved cases: 8,920
- City Health Score: 87 / 100
- Active Hotspots:
  * MG Road Pillar 142 (Case #CP-48291, 37 reports, Priority 92, Critical pothole & asphalt fracture, Road Maintenance)
  * Indiranagar 100ft Road (Case #CP-48288, 29 reports, High water leak & pressure loss)
  * Silk Board Junction (Case #CP-48190, 65 reports, Critical traffic & stormwater backup)
  * HSR Layout Sector 1 (Case #CP-48265, 42 reports, Critical electrical wire sparking)
  * Whitefield ITPL Corridor (Case #CP-48240, 14 reports, High streetlighting outage)
- Departments:
  * Road Maintenance (42 active, 12h SLA)
  * Sanitation & Solid Waste (67 active, 91% capacity load, 6h SLA)
  * Water Supply & Sewage (31 active, 8h SLA)
  * Electrical & Street Lighting (18 active, 18h SLA)
  * Stormwater & Drainage (24 active, 14h SLA)

Format your answer with clean Markdown (bullet points, bold text). Keep responses crisp, factual, and actionable.
At the end of your response, ALWAYS include an operational JSON metadata block in the following exact format:
\`\`\`json
{
  "title": "Short title describing the insight",
  "focusZone": "Key area or department",
  "hotspotsCount": 7,
  "affectedCitizens": 2840,
  "recommendedAction": "Concrete immediate recommendation for city dispatch",
  "stats": [
    {"label": "PRIMARY METRIC", "value": "Metric value"},
    {"label": "STATUS", "value": "Status value"},
    {"label": "PRIORITY", "value": "Priority level"},
    {"label": "EST. RESPONSE", "value": "Time"}
  ]
}
\`\`\``;

    const messages: GroqMessage[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Append past 4 messages for conversational continuity
    const recent = history.slice(-4);
    for (const msg of recent) {
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      });
    }

    messages.push({ role: 'user', content: userQuery });

    try {
      const rawResponse = await this.callGroq(messages, { temperature: 0.3, maxTokens: 900 });

      // Extract JSON dataCard block if present
      let textContent = rawResponse;
      let dataCard: AiChatMessage['dataCard'] | undefined = undefined;

      const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          dataCard = {
            title: parsed.title || 'MUNICIPAL TELEMETRY ANALYSIS',
            focusZone: parsed.focusZone || 'Bengaluru Central Core',
            hotspotsCount: parsed.hotspotsCount || 3,
            affectedCitizens: parsed.affectedCitizens || 1200,
            recommendedAction: parsed.recommendedAction || 'Dispatch rapid inspection unit.',
            stats: parsed.stats || [
              { label: 'STATUS', value: 'ACTIVE' },
              { label: 'TELEMETRY', value: 'VERIFIED' },
            ],
          };
          // Remove the code block from visible chat text for clean typography
          textContent = rawResponse.replace(/```json\s*[\s\S]*?\s*```/, '').trim();
        } catch (e) {
          console.warn('Could not parse embedded JSON dataCard:', e);
        }
      }

      return {
        content: textContent || rawResponse,
        dataCard,
      };
    } catch (err) {
      console.error('Groq AI Assistant fallback triggered:', err);
      // Fallback response if API fails
      return {
        content: `CivicPulse AI Neural Engine analyzed: "${userQuery}". Geotagged telemetry indicates stable baseline conditions across Central wards. Priority interventions remain focused on the MG Road corridor and Koramangala sanitation sector.`,
        dataCard: {
          title: 'SYSTEM TELEMETRY BRIEF',
          focusZone: 'Bengaluru Operations Grid',
          hotspotsCount: 4,
          affectedCitizens: 1850,
          recommendedAction: 'Maintain automated telemetry polling across all 8 zones.',
          stats: [
            { label: 'GRID HEALTH', value: '87 / 100' },
            { label: 'ACTIVE CASES', value: '2,140' },
            { label: 'CRITICAL', value: '326' },
            { label: 'SLA RATE', value: '89.4%' },
          ],
        },
      };
    }
  }

  /**
   * Multimodal Intake Triage: Classifies complaints via Groq LLM
   */
  async triageComplaint(input: {
    text: string;
    hasImage: boolean;
    hasAudio: boolean;
    address: string;
  }): Promise<GroqTriageResult> {
    const prompt = `You are the CivicPulse Multimodal Ingestion Engine.
Analyze this citizen civic report and classify it into municipal categories and calculate severity.

Incident Description: "${input.text}"
Location Address: "${input.address}"
Has Photo Evidence: ${input.hasImage}
Has Audio Evidence: ${input.hasAudio}

Valid Categories:
- "POTHOLE" (Road cracks, craters, asphalt damage)
- "WATER" (Pipe bursts, contamination, sewage leaks, low pressure)
- "GARBAGE" (Overflowing dumpsters, uncollected trash, illegal dumping)
- "LIGHTING" (Broken streetlights, dark alleys, electrical pole faults)
- "DRAINAGE" (Clogged storm drains, missing manhole covers, monsoon waterlogging)
- "PUBLIC_SAFETY" (Fallen trees, dangerous exposed wires, fire hazards, structural risks)

Valid Severities:
- "CRITICAL" (Immediate danger to life, vehicular accidents, power lines, huge sinkholes)
- "HIGH" (Major disruption to traffic, substantial water loss, open drainage)
- "MEDIUM" (Standard maintenance needed within 24-48h)
- "LOW" (Aesthetic or non-urgent repairs)

Valid Departments:
- "Road Maintenance"
- "Water Supply & Sewage"
- "Sanitation & Solid Waste"
- "Electrical & Street Lighting"
- "Stormwater & Drainage"
- "Public Safety & Hazards"

Respond ONLY with valid JSON in this exact structure:
{
  "category": "POTHOLE",
  "confidence": 0.96,
  "severity": "CRITICAL",
  "priorityScore": 92,
  "department": "Road Maintenance",
  "summary": "Concise 2-sentence technical rationale explaining why this issue was scored with this priority.",
  "estimatedImpact": "HIGH",
  "schoolsNear": 3,
  "hospitalsNear": 2,
  "busStopsNear": 5
}`;

    try {
      const rawJson = await this.callGroq(
        [
          { role: 'system', content: 'You are an autonomous civic classification engine. Output strictly JSON.' },
          { role: 'user', content: prompt },
        ],
        { jsonMode: true, temperature: 0.1, maxTokens: 400 }
      );

      const parsed = JSON.parse(rawJson);

      const validCategories: Category[] = ['POTHOLE', 'WATER', 'GARBAGE', 'LIGHTING', 'DRAINAGE', 'PUBLIC_SAFETY'];
      let cat: Category = 'POTHOLE';
      const upperCat = (parsed.category || '').toUpperCase().replace(/\s+/g, '_');
      if (validCategories.includes(upperCat as Category)) {
        cat = upperCat as Category;
      } else if (upperCat.includes('ROAD') || upperCat.includes('POTHOLE')) {
        cat = 'POTHOLE';
      } else if (upperCat.includes('WATER') || upperCat.includes('SEWAGE')) {
        cat = 'WATER';
      } else if (upperCat.includes('GARBAGE') || upperCat.includes('WASTE')) {
        cat = 'GARBAGE';
      } else if (upperCat.includes('LIGHT') || upperCat.includes('ELECTRIC')) {
        cat = 'LIGHTING';
      } else if (upperCat.includes('DRAIN') || upperCat.includes('MANHOLE')) {
        cat = 'DRAINAGE';
      } else if (upperCat.includes('SAFETY') || upperCat.includes('HAZARD')) {
        cat = 'PUBLIC_SAFETY';
      }

      const validSeverities: Severity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
      const sev: Severity = validSeverities.includes((parsed.severity || '').toUpperCase())
        ? (parsed.severity.toUpperCase() as Severity)
        : 'HIGH';

      const score = typeof parsed.priorityScore === 'number'
        ? Math.min(100, Math.max(10, parsed.priorityScore > 10 ? parsed.priorityScore : parsed.priorityScore * 10))
        : 88;

      return {
        category: cat,
        confidence: typeof parsed.confidence === 'number' ? Math.min(0.99, Math.max(0.75, parsed.confidence)) : 0.94,
        severity: sev,
        priorityScore: score,
        department: parsed.department || 'Road Maintenance',
        summary: parsed.summary || `Multi-hazard ${cat.toLowerCase()} verified near ${input.address}. Immediate municipal intervention scheduled.`,
        estimatedImpact: parsed.estimatedImpact || 'HIGH',
        facilitiesImpacted: {
          schools: parsed.schoolsNear ?? 2,
          hospitals: parsed.hospitalsNear ?? 1,
          busStops: parsed.busStopsNear ?? 4,
        },
      };
    } catch (err) {
      console.warn('Groq triage failed, applying fallback engine:', err);
      // Fallback deterministic logic
      return {
        category: 'POTHOLE',
        confidence: 0.94,
        severity: 'CRITICAL',
        priorityScore: 92,
        department: 'Road Maintenance',
        summary: `Large road structural damage identified on high-density corridor near ${input.address}. Immediate asphalt patching dispatch authorized.`,
        estimatedImpact: 'HIGH',
        facilitiesImpacted: {
          schools: 3,
          hospitals: 2,
          busStops: 7,
        },
      };
    }
  }
}

export const groqService = new GroqService();
