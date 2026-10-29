/**
 * Workflow savings estimator. The formula is deliberately simple and published on the page:
 *
 *   hours before   = tasks per month x minutes per task / 60
 *   hours automated = hours before x share automated
 *   review hours    = hours automated x review time
 *   net hours saved = hours automated - review hours
 *   monthly saving  = net hours saved x cost per hour
 *   annual saving   = monthly saving x 12
 *
 * It is an estimate from the visitor's own inputs, not a prediction or a guarantee.
 */

export interface RoiInputs {
  tasksPerMonth: number;
  minutesPerTask: number;
  hourlyCost: number;
  /** Share of the work the AI handles, 0-100. */
  automationPercent: number;
  /** Human review time as a share of the automated work, 0-100. */
  reviewPercent: number;
}

export interface RoiResult {
  hoursBefore: number;
  hoursAutomated: number;
  reviewHours: number;
  netHoursSaved: number;
  monthlySavings: number;
  annualSavings: number;
}

export const roiDefaults: RoiInputs = {
  tasksPerMonth: 2000,
  minutesPerTask: 12,
  hourlyCost: 25,
  automationPercent: 50,
  reviewPercent: 15,
};

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function calculateRoi(input: RoiInputs): RoiResult {
  const tasks = clamp(input.tasksPerMonth, 0, 1_000_000);
  const minutes = clamp(input.minutesPerTask, 0, 1_440);
  const rate = clamp(input.hourlyCost, 0, 10_000);
  const automation = clamp(input.automationPercent, 0, 100) / 100;
  const review = clamp(input.reviewPercent, 0, 100) / 100;

  const hoursBefore = (tasks * minutes) / 60;
  const hoursAutomated = hoursBefore * automation;
  const reviewHours = hoursAutomated * review;
  const netHoursSaved = hoursAutomated - reviewHours;
  const monthlySavings = netHoursSaved * rate;

  return {
    hoursBefore,
    hoursAutomated,
    reviewHours,
    netHoursSaved,
    monthlySavings,
    annualSavings: monthlySavings * 12,
  };
}
