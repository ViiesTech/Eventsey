import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Text from '../CustomText'; // Path adjust kar lijiyega structure ke mutabiq
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { showToast } from '../Toast';

const AddGuestModal = ({ visible, onClose, onSave, editingGuest }) => {
  // Local form input states
  const [fullName, setFullName] = useState('');
  const [relation, setRelation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Sync state if editing guest details changes
  useEffect(() => {
    if (editingGuest) {
      setFullName(editingGuest.name || '');
      setRelation(editingGuest.relation || '');
      setEmail(editingGuest.email || '');
      setPhone(editingGuest.phone || '');
    } else {
      clearForm();
    }
  }, [editingGuest, visible]);

  const clearForm = () => {
    setFullName('');
    setRelation('');
    setEmail('');
    setPhone('');
  };

  const handleUpdateOrSubmit = () => {
    if (!fullName.trim()) {
      showToast('Validation Error', 'Full Name is required.');
      return;
    }

    onSave({
      name: fullName,
      relation: relation || 'Guest',
      email: email,
      phone: phone,
    });

    clearForm();
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        clearForm();
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalDimmedOverlayBackground}>
          <View style={styles.modalCardFormWindowContainer}>
            {/* Dynamic Title based on Context */}
            <Text style={styles.modalContentTitleText}>
              {editingGuest ? 'Edit Guest' : 'Add Guest'}
            </Text>

            {/* Form Input Fields */}
            <TextInput
              style={styles.formTextInputFieldInstance}
              placeholder="Full Name"
              placeholderTextColor="#A0A0A0"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              style={styles.formTextInputFieldInstance}
              placeholder="Relation"
              placeholderTextColor="#A0A0A0"
              value={relation}
              onChangeText={setRelation}
            />

            <TextInput
              style={styles.formTextInputFieldInstance}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.formTextInputFieldInstance}
              placeholder="Phone"
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {!editingGuest && (
              <>
                {/* Custom Or Splitter Element */}
                <View style={styles.dividerOrWrapperLayoutRow}>
                  <View style={styles.dividerHorizontalLineSegment} />
                  <Text style={styles.orLabelMiddleTextText}>or</Text>
                  <View style={styles.dividerHorizontalLineSegment} />
                </View>

                {/* CSV/Excel Import Section */}
                <View style={styles.csvExcelFileImportDottedBoxFrameContainer}>
                  <Image source={AppImages.xl} style={styles.uploadIcon} />
                  <Text style={styles.importCaptionPromptPayloadLabelText}>
                    Import CSV / Excel
                  </Text>
                </View>
              </>
            )}

            {/* Bottom Trigger Action Buttons */}
            <View style={styles.modalActionTriggerButtonsLayoutRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalSecondaryCancelTriggerBtn}
                onPress={() => {
                  clearForm();
                  onClose();
                }}
              >
                <Text style={styles.modalSecondaryCancelLabelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalPrimarySubmitTriggerBtn}
                onPress={handleUpdateOrSubmit}
              >
                <Text style={styles.modalPrimarySubmitLabelText}>
                  {editingGuest ? 'Save Changes' : 'Add Guest'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDimmedOverlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(6),
  },
  modalCardFormWindowContainer: {
    backgroundColor: AppColors.white,
    width: '100%',
    borderRadius: 24,
    padding: responsiveWidth(6),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  modalContentTitleText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.2),
    alignSelf: 'flex-start',
  },
  formTextInputFieldInstance: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.4),
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
    marginBottom: responsiveHeight(1.5),
  },
  dividerOrWrapperLayoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(0.6),
  },
  dividerHorizontalLineSegment: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  orLabelMiddleTextText: {
    fontSize: responsiveFontSize(1.5),
    color: '#A0A0A0',
    marginHorizontal: responsiveWidth(3),
    fontWeight: '400',
  },
  csvExcelFileImportDottedBoxFrameContainer: {
    borderWidth: 1.5,
    borderColor: '#CCCDC2',
    borderStyle: 'dashed',
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    paddingVertical: responsiveHeight(2.2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2.8),
  },
  uploadIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
  },
  importCaptionPromptPayloadLabelText: {
    fontSize: responsiveFontSize(1.5),
    color: '#777777',
    fontWeight: '600',
  },
  modalActionTriggerButtonsLayoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSecondaryCancelTriggerBtn: {
    backgroundColor: 'rgba(244, 239, 233, 1)',
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.5),
    flex: 1,
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  modalSecondaryCancelLabelText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
  },
  modalPrimarySubmitTriggerBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.5),
    flex: 1,
    alignItems: 'center',
  },
  modalPrimarySubmitLabelText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
  },
});

export default AddGuestModal;
