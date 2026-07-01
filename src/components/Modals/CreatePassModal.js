import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Text from '../CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';

const CreatePassModal = ({ visible, onClose, onCreate }) => {
  const [passName, setPassName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [guestCapacity, setGuestCapacity] = useState('');

  // Date State Management
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [closingDateText, setClosingDateText] = useState('');

  const onChangeDate = (event, selectedDate) => {
    // Android par dismiss hone par picker hide karne ke liye
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);

      // Date format conversion (YYYY-MM-DD)
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setClosingDateText(formattedDate);
    }
  };

  const handleCreate = () => {
    const passData = {
      passName,
      totalAmount,
      guestCapacity,
      closingDate: closingDateText,
    };
    onCreate?.(passData);

    // Reset all states on success
    setPassName('');
    setTotalAmount('');
    setGuestCapacity('');
    setClosingDateText('');
    setDate(new Date());
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlayContainer}>
          <View style={styles.modalContentCard}>
            {/* Modal Title */}
            <Text style={styles.modalMainTitleText}>Create Admission Pass</Text>

            {/* Pass Name Input Field */}
            <View style={styles.inputGroupBlock}>
              <Text style={styles.inputLabelTypography}>Pass name</Text>
              <TextInput
                style={styles.formInputFieldElement}
                placeholder="Couple's or a service name"
                placeholderTextColor="#A0A0A0"
                value={passName}
                onChangeText={setPassName}
              />
            </View>

            {/* Total Amount Input Field */}
            <View style={styles.inputGroupBlock}>
              <Text style={styles.inputLabelTypography}>Total amount</Text>
              <TextInput
                style={styles.formInputFieldElement}
                placeholder="$ 15,000"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={totalAmount}
                onChangeText={setTotalAmount}
              />
            </View>

            {/* Guest Capacity Input Field */}
            <View style={styles.inputGroupBlock}>
              <Text style={styles.inputLabelTypography}>Guest capacity</Text>
              <TextInput
                style={styles.formInputFieldElement}
                placeholder="Number of guests"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={guestCapacity}
                onChangeText={setGuestCapacity}
              />
            </View>

            {/* RSVP / Closing Date Input Action Trigger */}
            <View style={styles.inputGroupBlock}>
              <Text style={styles.inputLabelTypography}>
                RSVP / closing date
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.formInputFieldElement,
                  styles.datePickerFieldStyle,
                ]}
              >
                <Text
                  style={{
                    color: closingDateText ? AppColors.black : '#A0A0A0',
                    fontSize: responsiveFontSize(1.7),
                  }}
                >
                  {closingDateText || 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Platform Specific DateTimePicker Inline Integration */}
            {showDatePicker && (
              <View
                style={Platform.OS === 'ios' ? styles.iosPickerWrapper : null}
              >
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  minimumDate={new Date()} // Prevents selection of past dates
                  onChange={onChangeDate}
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    style={styles.iosDoneButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.iosDoneButtonText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Action Buttons Management Footer */}
            <View style={styles.modalActionButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancelActionButtonTrigger}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonLabelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.createActionButtonTrigger}
                onPress={handleCreate}
              >
                <Text style={styles.createButtonLabelText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(8),
  },
  modalContentCard: {
    backgroundColor: AppColors.white,
    width: '100%',
    borderRadius: 24,
    padding: responsiveWidth(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalMainTitleText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  inputGroupBlock: {
    marginBottom: responsiveHeight(1.8),
  },
  inputLabelTypography: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: '#2D2D2D',
    marginBottom: responsiveHeight(0.8),
  },
  formInputFieldElement: {
    backgroundColor: '#F8F6F2',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
  },
  datePickerFieldStyle: {
    justifyContent: 'center',
  },
  iosPickerWrapper: {
    backgroundColor: '#F8F6F2',
    borderRadius: 12,
    padding: 10,
    marginBottom: responsiveHeight(1.8),
  },
  iosDoneButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginRight: 5,
  },
  iosDoneButtonText: {
    color: AppColors.secondary,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  modalActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  cancelActionButtonTrigger: {
    flex: 1,
    backgroundColor: '#F3EFEA',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  cancelButtonLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
  createActionButtonTrigger: {
    flex: 1,
    backgroundColor: AppColors.secondary,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(3),
  },
  createButtonLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
});

export default CreatePassModal;
