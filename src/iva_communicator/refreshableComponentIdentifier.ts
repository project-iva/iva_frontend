export enum RefreshableComponentIdentifier {
  CALORIES_VIEW = 'CALORIES_VIEW',
  BODY_MASS_VIEW = 'BODY_MASS_VIEW',
  DAY_PLAN_VIEW = 'DAY_PLAN_VIEW',
  DAY_GOALS_VIEW = 'DAY_GOALS_VIEW',
  SLEEP_STATS_VIEW = 'SLEEP_STATS_VIEW',
  MINDFUL_SESSIONS_STATS_VIEW = 'MINDFUL_SESSIONS_STATS_VIEW',
}

export interface RefreshComponentData {
  component_identifier: RefreshableComponentIdentifier
}
