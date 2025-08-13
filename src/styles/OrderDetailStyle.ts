import { StyleSheet } from 'react-native';

export const OrderDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    marginTop: 16,
    fontWeight: '400',
  },
  
  // Header - Minimal design
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  orderId: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '400',
  },
  liveUpdateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
    opacity: 0.8,
  },
  liveText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  demoButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginLeft: 4,
  },
  
  // Status Card - Clean and modern
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  
  // Minimal Status Header
  statusHeaderMinimal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  statusInfo: {
    flex: 1,
  },
  currentStatusMinimal: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  statusDescriptionMinimal: {
    fontSize: 15,
    color: '#666',
    fontWeight: '400',
    lineHeight: 20,
  },
  timeContainerMinimal: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  estimatedTimeMinimal: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    lineHeight: 32,
  },
  timeUnitMinimal: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginTop: -2,
  },
  
  // Food Delivery Timeline
  deliveryTimeline: {
    paddingVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 18,
    top: 36,
    width: 2,
    height: 48,
    backgroundColor: '#E8E8E8',
    borderRadius: 1,
  },
  timelineLineFill: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 1,
    position: 'absolute',
    bottom: 0,
  },
  timelineDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    position: 'relative',
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  timelineDotCurrent: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  timelinePulse: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    marginBottom: 2,
  },
  timelineLabelActive: {
    color: '#333',
    fontWeight: '600',
  },
  timelineLabelCurrent: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  timelineTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentStatus: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24,
    fontWeight: '400',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  estimatedTime: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
    marginLeft: 4,
  },
  
  // Progress Bar - Enhanced design
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  
  // Status Steps - Enhanced
  statusSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  statusDot: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    zIndex: 2,
  },
  dotActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#E8F5E8',
  },
  dotCurrent: {
    backgroundColor: '#2E7D32',
    transform: [{ scale: 1.1 }],
  },
  stepLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
  stepLabelActive: {
    color: '#424242',
    fontWeight: '600',
  },
  
  // Info Card - Clean layout
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#424242',
    marginLeft: 16,
    flex: 1,
    fontWeight: '400',
  },
  
  // Delivery Person - Modern card
  deliveryPersonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  deliveryPersonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryPersonDetails: {
    flex: 1,
    marginLeft: 16,
  },
  deliveryPersonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 4,
    fontWeight: '500',
  },
  vehicleNumber: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '400',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  // Items Card - Clean list
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 13,
    color: '#757575',
    fontWeight: '400',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#424242',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4CAF50',
  },

  // Rate Button - Minimal design
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  animationText: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
  lottieAnimationContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  
  // Enhanced Status Styles
  statusTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusBadge: {
    marginLeft: 8,
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  progressGlow: {
    height: '100%',
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  ripple: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    zIndex: 1,
  },
  stepLabelCurrent: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  connectionLine: {
    position: 'absolute',
    top: 18,
    left: '60%',
    right: '-40%',
    height: 2,
    backgroundColor: '#F0F0F0',
    zIndex: 1,
  },
  connectionLineFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});