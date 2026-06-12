'use server';
/**
 * @fileOverview This file contains a Genkit flow for predicting blood shortages.
 *
 * - predictBloodShortage - A function that predicts blood shortages for a specific blood type.
 * - AdminBloodShortagePredictionInput - The input type for the predictBloodShortage function.
 * - AdminBloodShortagePredictionOutput - The return type for the predictBloodShortage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminBloodShortagePredictionInputSchema = z.object({
  bloodType: z
    .string()
    .describe('The specific blood type for which to predict shortages (e.g., "A+", "O-").'),
  currentStock: z
    .number()
    .describe('The current number of units in stock for the specified blood type.'),
  forecastPeriodDays: z
    .number()
    .describe('The number of days into the future for which to predict shortages.'),
  recentDonations: z
    .array(
      z.object({
        date: z.string().describe('The date of the donation (YYYY-MM-DD).'),
        units: z.number().describe('The number of units donated.'),
      })
    )
    .describe('An array of recent donation events for the specified blood type.'),
  recentRequests: z
    .array(
      z.object({
        date: z.string().describe('The date of the request (YYYY-MM-DD).'),
        unitsRequested: z.number().describe('The number of units requested.'),
        urgency: z.string().describe('The urgency of the request (e.g., "routine", "emergency").'),
        fulfilled: z.boolean().describe('Whether the request was fully fulfilled.'),
      })
    )
    .describe('An array of recent blood request events for the specified blood type.'),
});
export type AdminBloodShortagePredictionInput = z.infer<
  typeof AdminBloodShortagePredictionInputSchema
>;

const AdminBloodShortagePredictionOutputSchema = z.object({
  prediction: z
    .enum([
      'no_shortage',
      'low_shortage_risk',
      'medium_shortage_risk',
      'high_shortage_risk',
      'imminent_shortage',
    ])
    .describe('The predicted shortage status.'),
  predictedShortfallUnits: z
    .number()
    .optional()
    .describe('The predicted number of units that will be short, if a shortage is predicted.'),
  rationale: z.string().describe('An explanation for the prediction.'),
  suggestedActions: z
    .array(z.string())
    .describe('A list of suggested proactive actions to mitigate potential shortages.'),
});
export type AdminBloodShortagePredictionOutput = z.infer<
  typeof AdminBloodShortagePredictionOutputSchema
>;

export async function predictBloodShortage(
  input: AdminBloodShortagePredictionInput
): Promise<AdminBloodShortagePredictionOutput> {
  return adminBloodShortagePredictionFlow(input);
}

const shortagePredictionPrompt = ai.definePrompt({
  name: 'shortagePredictionPrompt',
  input: {schema: AdminBloodShortagePredictionInputSchema},
  output: {schema: AdminBloodShortagePredictionOutputSchema},
  prompt: `You are an expert blood inventory manager and data analyst for a blood bank.
Your task is to predict potential blood shortages for a specific blood type based on provided historical donation and request patterns, current stock, and a future forecast period.

Analyze the following data carefully to make your prediction.

Blood Type for Prediction: {{{bloodType}}}
Current Stock (units): {{{currentStock}}}
Forecast Period: {{{forecastPeriodDays}}} days into the future

--- Recent Donation History (for {{{bloodType}}}) ---
{{#if recentDonations}}
  {{#each recentDonations}}
    Date: {{{this.date}}}, Units Donated: {{{this.units}}}
  {{/each}}
{{else}}
  No recent donation data available for {{{bloodType}}}.
{{/if}}

--- Recent Request History (for {{{bloodType}}}) ---
{{#if recentRequests}}
  {{#each recentRequests}}
    Date: {{{this.date}}}, Units Requested: {{{this.unitsRequested}}}, Urgency: {{{this.urgency}}}, Fulfilled: {{{this.fulfilled}}}
  {{/each}}
{{else}}
  No recent request data available for {{{bloodType}}}.
{{/if}}

Based on this information, predict the likelihood and severity of a blood shortage for blood type '{{{bloodType}}}' within the next '{{{forecastPeriodDays}}}' days. 

Provide your prediction, quantify the predicted shortfall in units if applicable, explain your rationale based on the trends observed, and suggest concrete, proactive actions to manage inventory and prevent the shortage.

Consider average daily demand, donation frequency, and the impact of unfulfilled emergency requests in your analysis.`,
});

const adminBloodShortagePredictionFlow = ai.defineFlow(
  {
    name: 'adminBloodShortagePredictionFlow',
    inputSchema: AdminBloodShortagePredictionInputSchema,
    outputSchema: AdminBloodShortagePredictionOutputSchema,
  },
  async input => {
    const {output} = await shortagePredictionPrompt(input);
    return output!;
  }
);
