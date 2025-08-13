import HapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const types = {
  light: 'impactLight' as HapticFeedbackTypes,
  medium: 'impactMedium' as HapticFeedbackTypes,
  heavy: 'impactHeavy' as HapticFeedbackTypes,
  success: 'notificationSuccess' as HapticFeedbackTypes,
  warning: 'notificationWarning' as HapticFeedbackTypes,
  error: 'notificationError' as HapticFeedbackTypes,
  selection: 'selection' as HapticFeedbackTypes,
};

export const haptic = {
  light: () => HapticFeedback.trigger(types.light, hapticOptions),
  medium: () => HapticFeedback.trigger(types.medium, hapticOptions),
  heavy: () => HapticFeedback.trigger(types.heavy, hapticOptions),
  success: () => HapticFeedback.trigger(types.success, hapticOptions),
  warning: () => HapticFeedback.trigger(types.warning, hapticOptions),
  error: () => HapticFeedback.trigger(types.error, hapticOptions),
  selection: () => HapticFeedback.trigger(types.selection, hapticOptions),
};

export const hapticActions = {
  buttonPress: haptic.light,
  medium: haptic.medium,
  tabSwitch: haptic.selection,
  addToCart: haptic.medium,
  removeFromCart: haptic.light,
  quantityChange: haptic.light,
  navigate: haptic.light,
  orderSuccess: haptic.success,
  orderFailure: haptic.error,
  warning: haptic.warning,
  toggle: haptic.selection,
  selection: haptic.selection,
  swipe: haptic.light,
  refresh: haptic.medium,
  longPress: haptic.medium,
  delete: haptic.warning,
  filterChange: haptic.selection,
};
