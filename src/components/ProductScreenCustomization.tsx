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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SIZE_OPTIONS = [
  { label: 'S', value: 'Small' },
  { label: 'M', value: 'Medium' },
  { label: 'L', value: 'Large' },
];
const MILK_TYPES = ['No Milk', 'Regular', 'Soy'];
const SPICE_BLEND = [{ label: 'Ginger' }, { label: 'Elaichi' }];
const STRENGTH = ['Mild', 'Regular', 'Strong'];
const ADDONS = ['Mint', 'Lemon'];
const SWEETNESS_OPTIONS = ['Less Sweet', 'Regular', 'Extra Sweet'];

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
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
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

  const sections = [
    {
      title: 'Size',
      selectedValue: selectedSize,
      options: SIZE_OPTIONS.map(o => ({ ...o, key: o.value })),
      setter: setSelectedSize,
      isMulti: false,
    },
    {
      title: 'Milk',
      selectedValue: selectedMilk,
      options: MILK_TYPES.map(m => ({ key: m, label: m })),
      setter: setSelectedMilk,
      isMulti: false,
    },
    ...(showSweetness
      ? [
          {
            title: 'Sweetness',
            selectedValue: selectedSweetness,
            options: SWEETNESS_OPTIONS.map(s => ({ key: s, label: s })),
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
      options: SPICE_BLEND.map(s => ({ key: s.label, label: s.label })),
      setter: handleSpiceSelection,
      isMulti: true,
      state: selectedSpices,
    },
    {
      title: 'Strength',
      selectedValue: selectedStrength,
      options: STRENGTH.map(s => ({ key: s, label: s })),
      setter: setSelectedStrength,
      isMulti: false,
    },
    {
      title: 'Add-ons',
      selectedValue: selectedAddons.join(', ') || 'None',
      options: ADDONS.map(a => ({ key: a, label: a })),
      setter: handleAddonSelection,
      isMulti: true,
      state: selectedAddons,
    },
  ];

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
              {options.map(opt => {
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
                      {opt.label}
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
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
    minWidth: '30%',
  },
  selectedOption: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  optionLabel: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#ffffff',
  },
});

export default ProductScreenCustomization;
