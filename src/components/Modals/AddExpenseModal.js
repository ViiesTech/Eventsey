import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../CustomText';
import CustomDropdown from '../CustomDropdown';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';

const AddExpenseModal = ({ visible, onClose, onAddExpense }) => {
  const [category, setCategory] = useState(null); // Managed as string/value structure token
  const [estimatedAmount, setEstimatedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');

  // Transformed list structure to match custom dropdown requirement layout criteria
  const categoriesData = [
    { label: 'Venue', value: 'Venue' },
    { label: 'Wedding Planner', value: 'Wedding Planner' },
    { label: 'Flowers', value: 'Flowers' },
    { label: 'Catering', value: 'Catering' },
    { label: 'Photographer', value: 'Photographer' },
    { label: 'Videographer', value: 'Videographer' },
  ];

  const handleAddPress = () => {
    if (!category || !estimatedAmount) {
      alert('Please fill the Category and Estimated Amount');
      return;
    }

    onAddExpense({
      category: category,
      estimated: `$ ${parseFloat(estimatedAmount).toLocaleString()}`,
      actual: actualAmount
        ? `$ ${parseFloat(actualAmount).toLocaleString()}`
        : '$ 0',
    });

    // Resetting inputs context wrapper state
    setCategory(null);
    setEstimatedAmount('');
    setActualAmount('');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlayContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContentCardSurface}>
              <Text style={styles.modalTitleText}>Add Expense</Text>

              {/* Integrated CustomDropdown component view instance container */}
              <View style={styles.inputStackWrapper}>
                <CustomDropdown
                  data={categoriesData}
                  value={category}
                  onChange={item => setCategory(item.value)}
                  placeholder="Category"
                  dropdowBgColor="#F8F8F8" // Kept matching background profile setup tint
                />
              </View>

              {/* Estimated Amount Field Group */}
              <View style={styles.inputStackWrapper}>
                <TextInput
                  style={styles.textInputFieldWidget}
                  placeholder="Estimated Amount"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="numeric"
                  value={estimatedAmount}
                  onChangeText={setEstimatedAmount}
                />
              </View>

              {/* Actual Amount Field Group */}
              <View style={styles.inputStackWrapper}>
                <TextInput
                  style={styles.textInputFieldWidget}
                  placeholder="Actual Amount"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="numeric"
                  value={actualAmount}
                  onChangeText={setActualAmount}
                />
              </View>

              {/* Control Flow Execution Button Interface Row */}
              <View style={styles.actionButtonsFlexRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cancelActionButtonTrigger}
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonActionLabelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.addSubmitButtonTrigger}
                  onPress={handleAddPress}
                >
                  <Text style={styles.addSubmitButtonActionLabelText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(34, 35, 37, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentCardSurface: {
    width: responsiveWidth(84),
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(3.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  modalTitleText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '800',
    color: '#222325',
    marginBottom: responsiveHeight(2.5),
  },
  inputStackWrapper: {
    width: '100%',
    marginBottom: responsiveHeight(2),
  },
  textInputFieldWidget: {
    width: '100%',
    height: responsiveHeight(5.5), // Unified to match CustomDropdown component layout sizing rules
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.5),
    color: '#222325',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  actionButtonsFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
  },
  cancelActionButtonTrigger: {
    width: '46%',
    height: responsiveHeight(6),
    backgroundColor: '#F2E6E4',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonActionLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: '#E27A65',
  },
  addSubmitButtonTrigger: {
    width: '46%',
    height: responsiveHeight(6),
    backgroundColor: AppColors.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSubmitButtonActionLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.white,
  },
});

export default AddExpenseModal;
