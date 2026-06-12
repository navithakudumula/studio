'use server';
/**
 * @fileOverview This flow intelligently analyzes blood request urgency, required blood type, and patient location
 * to suggest the most suitable available donors or blood banks nearby.
 *
 * - hospitalSmartDonorMatcher - A function that handles the smart donor matching process.
 * - HospitalSmartDonorMatcherInput - The input type for the hospitalSmartDonorMatcher function.
 * - HospitalSmartDonorMatcherOutput - The return type for the hospitalSmartDonorMatcher function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HospitalSmartDonorMatcherInputSchema = z.object({
  requestId: z.string().describe('Unique identifier for the blood request.'),
  hospitalId: z.string().describe('Unique identifier for the requesting hospital.'),
  requiredBloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .describe('The specific blood type required for the patient.'),
  urgencyLevel:
    z.enum(['emergency', 'urgent', 'standard']).describe('The urgency level of the blood request.'),
  patientLocation: z
    .object({
      lat: z.number().describe('Latitude of the patient/hospital location.'),
      lng: z.number().describe('Longitude of the patient/hospital location.'),
      city: z.string().describe('City of the patient/hospital location.'),
      district: z.string().describe('District of the patient/hospital location.'),
      pinCode: z.string().describe('PIN code of the patient/hospital location.'),
    })
    .describe('Geographic location of the patient or requesting hospital.'),
});
export type HospitalSmartDonorMatcherInput = z.infer<typeof HospitalSmartDonorMatcherInputSchema>;

const RecommendationSchema = z.object({
  type: z.enum(['donor', 'blood_bank']).describe('Type of the recommendation: either a donor or a blood bank.'),
  id: z.string().describe('Unique identifier for the recommended entity (donorId or bloodBankId).'),
  name: z.string().describe('Name of the recommended donor or blood bank.'),
  contactInfo: z.string().describe('Contact information (e.g., phone, email, address) for the recommended entity.'),
  distanceKm: z.number().optional().describe('Distance in kilometers from the patient location to the recommended entity.'),
  bloodTypeMatch:
    z.enum(['Exact', 'Compatible'])
      .describe('Indicates if the blood type is an exact match or compatible.'),
  reasoning: z.string().describe('A brief explanation of why this entity is recommended.'),
  availableUnits: z.number().optional().describe('Number of blood units available (for blood banks).'),
});

const HospitalSmartDonorMatcherOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of recommended donors or blood banks.'),
  message: z.string().describe('An overall message or summary regarding the recommendations.'),
});
export type HospitalSmartDonorMatcherOutput = z.infer<typeof HospitalSmartDonorMatcherOutputSchema>;

// Placeholder tool for retrieving available blood banks and their inventory
const getAvailableBloodBanks = ai.defineTool(
  {
    name: 'getAvailableBloodBanks',
    description: 'Retrieves a list of nearby blood banks and their current blood inventory based on location and required blood type.',
    inputSchema: z.object({
      bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).describe('The blood type to search for.'),
      lat: z.number().describe('Latitude of the search center.'),
      lng: z.number().describe('Longitude of the search center.'),
      radiusKm: z.number().default(50).describe('Search radius in kilometers.'),
    }),
    outputSchema: z.array(z.object({
      id: z.string().describe('Blood bank ID.'),
      name: z.string().describe('Blood bank name.'),
      address: z.string().describe('Blood bank address.'),
      contact: z.string().describe('Blood bank contact information.'),
      distanceKm: z.number().describe('Distance from the search center in kilometers.'),
      inventory: z.record(z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']), z.number()).describe('Current inventory of blood types and units.'),
    })),
  },
  async (input) => {
    // This is a placeholder. In a real application, this would query a database or external service.
    console.log(`Tool: Searching for blood banks for ${input.bloodType} near ${input.lat},${input.lng} within ${input.radiusKm}km`);
    // Simulate some data
    if (input.bloodType === 'O-' && input.lat && input.lng) {
      return [
        {
          id: 'bb_1',
          name: 'Central Blood Bank',
          address: '123 Main St, City, District',
          contact: '111-222-3333',
          distanceKm: 5,
          inventory: { 'O-': 5, 'A+': 10 },
        },
        {
          id: 'bb_2',
          name: 'City Hospital Blood Center',
          address: '456 Oak Ave, City, District',
          contact: '444-555-6666',
          distanceKm: 12,
          inventory: { 'O-': 2, 'B+': 7 },
        },
      ];
    }
    return [];
  }
);

// Placeholder tool for retrieving nearby donors
const getNearbyDonors = ai.defineTool(
  {
    name: 'getNearbyDonors',
    description: 'Retrieves a list of available donors matching the required blood type and location.',
    inputSchema: z.object({
      bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).describe('The blood type of the donor.'),
      lat: z.number().describe('Latitude of the search center.'),
      lng: z.number().describe('Longitude of the search center.'),
      radiusKm: z.number().default(20).describe('Search radius in kilometers.'),
      urgency: z.enum(['emergency', 'urgent', 'standard']).describe('Urgency level to filter donors who are willing to donate for this urgency.'),
    }),
    outputSchema: z.array(z.object({
      id: z.string().describe('Donor ID.'),
      name: z.string().describe('Donor name.'),
      contact: z.string().describe('Donor contact information.'),
      distanceKm: z.number().describe('Distance from the search center in kilometers.'),
      bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).describe('Donor blood type.'),
    })),
  },
  async (input) => {
    // This is a placeholder. In a real application, this would query a database or external service.
    console.log(`Tool: Searching for donors for ${input.bloodType} with urgency ${input.urgency} near ${input.lat},${input.lng} within ${input.radiusKm}km`);
    // Simulate some data
    if (input.bloodType === 'O-' && input.urgency === 'emergency' && input.lat && input.lng) {
      return [
        {
          id: 'd_1',
          name: 'John Doe',
          contact: 'john.doe@example.com',
          distanceKm: 3,
          bloodType: 'O-',
        },
        {
          id: 'd_2',
          name: 'Jane Smith',
          contact: 'jane.smith@example.com',
          distanceKm: 8,
          bloodType: 'O-',
        },
      ];
    }
    return [];
  }
);

const smartDonorMatcherPrompt = ai.definePrompt({
  name: 'smartDonorMatcherPrompt',
  input: { schema: HospitalSmartDonorMatcherInputSchema },
  output: { schema: HospitalSmartDonorMatcherOutputSchema },
  tools: [getAvailableBloodBanks, getNearbyDonors],
  prompt: `You are an AI assistant designed to help hospital staff quickly find suitable blood donors or blood banks.

Given the following blood request details, your task is to leverage the available tools to find the most appropriate sources of blood and provide detailed recommendations.

Blood Request Details:
- Request ID: {{{requestId}}}
- Hospital ID: {{{hospitalId}}}
- Required Blood Type: {{{requiredBloodType}}}
- Urgency Level: {{{urgencyLevel}}}
- Patient Location:
  - Latitude: {{{patientLocation.lat}}}
  - Longitude: {{{patientLocation.lng}}}
  - City: {{{patientLocation.city}}}
  - District: {{{patientLocation.district}}}
  - PIN Code: {{{patientLocation.pinCode}}}


Instructions:
1. First, consider the 'urgencyLevel'. For 'emergency' requests, prioritize immediate availability and proximity.
2. Use the 'getAvailableBloodBanks' tool to check for blood banks that have the '{{requiredBloodType}}' or compatible blood types in stock near the patient's location. Consider a larger radius for urgent/emergency cases.
3. Use the 'getNearbyDonors' tool to find individual donors who match the '{{requiredBloodType}}' and are near the patient's location, especially for 'emergency' and 'urgent' requests.
4. Analyze the results from both tools. Prioritize exact blood type matches and closer distances.
5. Provide a list of up to 5 recommendations, clearly stating whether it's a donor or a blood bank, their name, contact information, approximate distance, blood type match (Exact/Compatible), and a brief reasoning for the recommendation.
6. Ensure the output strictly adheres to the HospitalSmartDonorMatcherOutputSchema.

If no suitable donors or blood banks are found, state that in the 'message' field.
`,
});

const hospitalSmartDonorMatcherFlow = ai.defineFlow(
  {
    name: 'hospitalSmartDonorMatcherFlow',
    inputSchema: HospitalSmartDonorMatcherInputSchema,
    outputSchema: HospitalSmartDonorMatcherOutputSchema,
  },
  async (input) => {
    const { output } = await smartDonorMatcherPrompt(input);
    return output!;
  }
);

export async function hospitalSmartDonorMatcher(
  input: HospitalSmartDonorMatcherInput
): Promise<HospitalSmartDonorMatcherOutput> {
  return hospitalSmartDonorMatcherFlow(input);
}
