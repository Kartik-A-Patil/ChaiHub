import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { hapticActions } from '../utils/hapticUtils';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SIZE_OPTIONS = [
  { label: 'S', value: 'Small', priceMultiplier: 0.85 },
  { label: 'M', value: 'Medium', priceMultiplier: 1.0 },
  { label: 'L', value: 'Large', priceMultiplier: 1.25 },
];
const MILK_TYPES = ['No Milk', 'Regular', 'Soy'];
const MILK_PRICES = { 'No Milk': 0, 'Regular': 0.25, 'Soy': 0.5 };
const SPICE_BLEND = [{ label: 'Ginger' }, { label: 'Elaichi' }];
const STRENGTH = ['Mild', 'Regular', 'Strong'];
const STRENGTH_PRICES = { 'Mild': 0, 'Regular': 0, 'Strong': 0.25 };
const TEA_ADDONS = ['Mint', 'Lemon'];
const TEA_ADDON_PRICES = { 'Mint': 0.4, 'Lemon': 0.4 };
const COFFEE_ADDONS = ['Extra Shot', 'Vanilla Syrup', 'Caramel Syrup', 'Whipped Cream'];
const COFFEE_ADDON_PRICES = { 'Extra Shot': 1.0, 'Vanilla Syrup': 0.5, 'Caramel Syrup': 0.5, 'Whipped Cream': 0.75 };
const SWEETNESS_OPTIONS = ['Less Sweet', 'Regular', 'Extra Sweet'];
const SWEETNESS_PRICES = { 'Less Sweet': 0, 'Regular': 0, 'Extra Sweet': 0.2 };

interface CustomizationAccordionProps {
  title: string;
  selectedValue: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const CustomizationAccordion: React.FC<CustomizationAccordionProps> = ({ title, selectedValue, children, isOpen, onToggle }) => {
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={() => {
        hapticActions.toggle();
        onToggle();
      }}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.selectedValue}>{selectedValue}</Text>
          <Icon
            name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={22}
            color="#495057"
          />
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

interface Props {
  productType: string;
  basePrice?: number;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedMilk: string;
  setSelectedMilk: (milk: string) => void;
  selectedSpices: { [key: string]: string };
  setSelectedSpices: (spices: { [key: string]: string }) => void;
  selectedStrength: string;
  setSelectedStrength: (strength: string) => void;
  selectedAddons: string[];
  setSelectedAddons: (addons: string[]) => void;
  selectedSweetness?: string;
  setSelectedSweetness?: (sweetness: string) => void;
  showSweetness?: boolean;
}

const ProductScreenCustomization: React.FC<Props> = ({
  productType,
  basePrice = 0,
  selectedSize,
  setSelectedSize,
  selectedMilk,
  setSelectedMilk,
  selectedSpices,
  setSelectedSpices,
  selectedStrength,
  setSelectedStrength,
  selectedAddons,
  setSelectedAddons,
  selectedSweetness,
  setSelectedSweetness,
  showSweetness = false,
}) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>(["Size"]);

  const toggleAccordion = useCallback((title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenAccordions(prevOpen => {
      const isOpen = prevOpen.includes(title);
      if (isOpen) {
        return prevOpen.filter(item => item !== title);
      } else {
        const newOpen = [...prevOpen, title];
        if (newOpen.length > 2) {
          newOpen.shift(); 
        }
        return newOpen;
      }
    });
  }, []);

  const handleSelection = (setter: Function, value: any) => {
    hapticActions.selection();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(value);
  };

  const handleSpiceSelection = (spice: string) => {
    const newSpices = { ...selectedSpices };
    if (newSpices[spice] === 'Regular') {
      newSpices[spice] = 'None';
    } else {
      newSpices[spice] = 'Regular';
    }
    handleSelection(setSelectedSpices, newSpices);
  };

  const handleAddonSelection = (addon: string) => {
    const newAddons = selectedAddons.includes(addon)
      ? selectedAddons.filter(a => a !== addon)
      : [...selectedAddons, addon];
    handleSelection(setSelectedAddons, newAddons);
  };

  // Define sections based on product type
  const getSections = () => {
    const baseSizeSection = {
      title: 'Size',
      selectedValue: selectedSize,
      options: SIZE_OPTIONS.map(o => ({
        ...o,
        key: o.value,
        displayLabel: basePrice > 0 
          ? `${o.label} $${(basePrice * o.priceMultiplier).toFixed(2)}`
          : o.label
      })),
      setter: setSelectedSize,
      isMulti: false,
    };

    if (productType === 'tea') {
      // Tea: Show all options
      return [
        baseSizeSection,
        {
          title: 'Milk',
          selectedValue: selectedMilk,
          options: MILK_TYPES.map(m => ({ 
            key: m, 
            label: m,
            displayLabel: MILK_PRICES[m as keyof typeof MILK_PRICES] > 0 
              ? `${m} +$${MILK_PRICES[m as keyof typeof MILK_PRICES].toFixed(2)}`
              : m
          })),
          setter: setSelectedMilk,
          isMulti: false,
        },
        ...(showSweetness
          ? [
              {
                title: 'Sweetness',
                selectedValue: selectedSweetness,
                options: SWEETNESS_OPTIONS.map(s => ({ 
                  key: s, 
                  label: s,
                  displayLabel: SWEETNESS_PRICES[s as keyof typeof SWEETNESS_PRICES] > 0
                    ? `${s} +$${SWEETNESS_PRICES[s as keyof typeof SWEETNESS_PRICES].toFixed(2)}`
                    : s
                })),
                setter: setSelectedSweetness,
                isMulti: false,
              },
            ]
          : []),
        {
          title: 'Spices',
          selectedValue:
            Object.entries(selectedSpices)
              .filter(([, value]) => value === 'Regular')
              .map(([key]) => key)
              .join(', ') || 'None',
          options: SPICE_BLEND.map(s => ({ 
            key: s.label, 
            label: s.label,
            displayLabel: `${s.label} +$0.30`
          })),
          setter: handleSpiceSelection,
          isMulti: true,
          state: selectedSpices,
        },
        {
          title: 'Strength',
          selectedValue: selectedStrength,
          options: STRENGTH.map(s => ({ 
            key: s, 
            label: s,
            displayLabel: STRENGTH_PRICES[s as keyof typeof STRENGTH_PRICES] > 0
              ? `${s} +$${STRENGTH_PRICES[s as keyof typeof STRENGTH_PRICES].toFixed(2)}`
              : s
          })),
          setter: setSelectedStrength,
          isMulti: false,
        },
        {
          title: 'Add-ons',
          selectedValue: selectedAddons.join(', ') || 'None',
          options: TEA_ADDONS.map(a => ({ 
            key: a, 
            label: a,
            displayLabel: `${a} +$${TEA_ADDON_PRICES[a as keyof typeof TEA_ADDON_PRICES].toFixed(2)}`
          })),
          setter: handleAddonSelection,
          isMulti: true,
          state: selectedAddons,
        },
      ];
    } else if (productType === 'coffee') {
      // Coffee: Remove spices, add different add-ons
      return [
        baseSizeSection,
        {
          title: 'Milk',
          selectedValue: selectedMilk,
          options: MILK_TYPES.map(m => ({ 
            key: m, 
            label: m,
            displayLabel: m === 'Soy' ? `${m} +$0.60` :
                        m === 'Regular' ? `${m} +$0.30` : m
          })),
          setter: setSelectedMilk,
          isMulti: false,
        },
        ...(showSweetness
          ? [
              {
                title: 'Sweetness',
                selectedValue: selectedSweetness,
                options: SWEETNESS_OPTIONS.map(s => ({ 
                  key: s, 
                  label: s,
                  displayLabel: s === 'Extra Sweet' 
                    ? `${s} +$0.25`
                    : s
                })),
                setter: setSelectedSweetness,
                isMulti: false,
              },
            ]
          : []),
        {
          title: 'Strength',
          selectedValue: selectedStrength,
          options: STRENGTH.map(s => ({ 
            key: s, 
            label: s,
            displayLabel: s === 'Strong'
              ? `${s} +$0.40`
              : s
          })),
          setter: setSelectedStrength,
          isMulti: false,
        },
        {
          title: 'Add-ons',
          selectedValue: selectedAddons.join(', ') || 'None',
          options: COFFEE_ADDONS.map(a => ({ 
            key: a, 
            label: a,
            displayLabel: `${a} +$${COFFEE_ADDON_PRICES[a as keyof typeof COFFEE_ADDON_PRICES].toFixed(2)}`
          })),
          setter: handleAddonSelection,
          isMulti: true,
          state: selectedAddons,
        },
      ];
    } else if (productType === 'snacks' || productType === 'others') {
      // Snacks and Others: Only show size
      return [baseSizeSection];
    }

    // Default fallback
    return [baseSizeSection];
  };

  const sections = getSections();

  return (
    <View style={styles.container}>
      {sections.map(
        ({ title, selectedValue, options, setter, isMulti, state }) => (
          <CustomizationAccordion
            key={title}
            title={title}
            selectedValue={selectedValue!}
            isOpen={openAccordions.includes(title)}
            onToggle={() => toggleAccordion(title)}
          >
            <View style={styles.optionsContainer}>
              {options.map((opt: any, index: number) => {
                // Calculate dynamic width based on number of options
                const optionsPerRow = options.length === 1 ? 1 :
                                    options.length === 2 ? 2 :
                                    options.length === 3 ? 3 :
                                    options.length === 4 ? 2 :
                                    3; // For 5+ options, use 3 per row
                const dynamicWidth = (100 / optionsPerRow) - 2; // Subtract for gaps
                
                // Type guards for state
                let isSelected = false;
                if (isMulti) {
                  if (title === 'Spices') {
                    isSelected = !!(
                      state &&
                      typeof state === 'object' &&
                      !Array.isArray(state) &&
                      state[opt.key] === 'Regular'
                    );
                  } else {
                    isSelected = !!(
                      Array.isArray(state) &&
                      state.includes &&
                      state.includes(opt.key)
                    );
                  }
                } else {
                  isSelected = selectedValue === opt.key;
                }
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOption,
                      { width: `${dynamicWidth}%` }
                    ]}
                    onPress={() => {
                      if (isMulti) {
                        if (typeof setter === 'function') {
                          setter(opt.key);
                        }
                      } else {
                        if (typeof setter === 'function') {
                          handleSelection(setter, opt.key);
                        }
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.selectedLabel,
                      ]}
                    >
                      {opt.displayLabel ? (
                        <>
                          {opt.label}
                          {opt.displayLabel !== opt.label && (
                            <Text style={[
                              styles.priceText,
                              isSelected && styles.selectedPriceText
                            ]}>
                              {'\n' + opt.displayLabel.replace(opt.label, '').trim()}
                            </Text>
                          )}
                        </>
                      ) : (
                        opt.label
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </CustomizationAccordion>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 1,
    paddingVertical: 8,
  },
  accordionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.4,
    borderColor: '#d1d1d1ff',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1a1a1a',
  },
  selectedValue: {
    fontWeight: '500',
    fontSize: 14,
    color: '#868e96',
    marginRight: 8,
  },
  accordionContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  optionLabel: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 15,
    flexWrap: 'wrap',
  },
  selectedLabel: {
    color: '#ffffff',
  },
  priceText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6c757d',
    lineHeight: 13,
  },
  selectedPriceText: {
    color: '#e9ecef',
  },
});

export default ProductScreenCustomization;
