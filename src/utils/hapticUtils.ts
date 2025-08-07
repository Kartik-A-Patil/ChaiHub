import HapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';

// Haptic feedback options
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const HapticTypes = {
  LIGHT: 'impactLight' as HapticFeedbackTypes,
  MEDIUM: 'impactMedium' as HapticFeedbackTypes,
  HEAVY: 'impactHeavy' as HapticFeedbackTypes,
  SUCCESS: 'notificationSuccess' as HapticFeedbackTypes,
  WARNING: 'notificationWarning' as HapticFeedbackTypes,
  ERROR: 'notificationError' as HapticFeedbackTypes,
  SELECTION: 'selection' as HapticFeedbackTypes,
};

// Centralized haptic feedback functions
export const hapticFeedback = {
  // Light impact for buttons, taps
  light: () => HapticFeedback.trigger(HapticTypes.LIGHT, options),
  
  // Medium impact for important actions
  medium: () => HapticFeedback.trigger(HapticTypes.MEDIUM, options),
  
  // Heavy impact for critical actions
  heavy: () => HapticFeedback.trigger(HapticTypes.HEAVY, options),
  
  // Success feedback for completed actions
  success: () => HapticFeedback.trigger(HapticTypes.SUCCESS, options),
  
  // Warning feedback for cautionary actions
  warning: () => HapticFeedback.trigger(HapticTypes.WARNING, options),
  
  // Error feedback for failed actions
  error: () => HapticFeedback.trigger(HapticTypes.ERROR, options),
  
  // Selection feedback for picker/selector changes
  selection: () => HapticFeedback.trigger(HapticTypes.SELECTION, options),
};

// Specific use case functions
export const hapticActions = {
  // Button presses
  buttonPress: () => hapticFeedback.light(),
  
  // Medium impact for important buttons
  medium: () => hapticFeedback.medium(),
  
  // Tab switches
  tabSwitch: () => hapticFeedback.selection(),
  
  // Add to cart
  addToCart: () => hapticFeedback.medium(),
  
  // Remove from cart
  removeFromCart: () => hapticFeedback.light(),
  
  // Quantity changes
  quantityChange: () => hapticFeedback.light(),
  
  // Navigation
  navigate: () => hapticFeedback.light(),
  
  // Order success
  orderSuccess: () => hapticFeedback.success(),
  
  // Order failure
  orderFailure: () => hapticFeedback.error(),
  
  // Warning feedback
  warning: () => hapticFeedback.warning(),
  
  // Toggle switches
  toggle: () => hapticFeedback.selection(),
  
  // Selection feedback for option changes
  selection: () => hapticFeedback.selection(),
  
  // Swipe actions
  swipe: () => hapticFeedback.light(),
  
  // Pull to refresh
  refresh: () => hapticFeedback.medium(),
  
  // Long press
  longPress: () => hapticFeedback.medium(),
  
  // Delete/Remove actions
  delete: () => hapticFeedback.warning(),
  
  // Filter/Sort changes
  filterChange: () => hapticFeedback.selection(),
};
