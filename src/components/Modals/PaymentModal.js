import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Text from '../../components/CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const PaymentModal = ({
  isVisible,
  onClose,
  onConfirm,
  vendorName = 'Premium Events Co.',
  amount,
  setAmount,
  note,
  setNote,
}) => {
  // Check if amount is entered to change confirm button state dynamically
  const isAmountEntered = amount && parseFloat(amount) > 0;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayContainer}>
        <View style={styles.makePaymentCardCanvas}>
          {/* Top Circular Brand Accent Badge */}
          <View style={styles.topCardCircleBadge}>
            <Image source={AppImages.card} style={styles.badgeCardIcon} />
          </View>

          {/* Headings */}
          <Text style={styles.mainModalTitleHeadingText}>Make Payment</Text>
          <Text style={styles.subtextContextLabel}>
            Send payment to{' '}
            <Text style={styles.highlightedVendorNameString}>{vendorName}</Text>
          </Text>

          {/* Form Content Section */}
          <View style={styles.formInteractionContainerSection}>
            {/* Input Field: Payment Amount */}
            <Text style={styles.inputFieldMetaTitleLabel}>
              Payment Amount *
            </Text>
            <View style={styles.inlineAmountInputFieldWrapperRow}>
              <Text style={styles.currencyPrefixSymbolInline}>$</Text>
              <TextInput
                style={styles.numericValueInputElementField}
                placeholder="0.00"
                placeholderTextColor="#A4A4A4"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Input Field: Note (Optional) */}
            <Text style={styles.inputFieldMetaTitleLabel}>Note (Optional)</Text>
            <TextInput
              style={styles.multilineTextInputBlockWrapperField}
              placeholder="Add payment note..."
              placeholderTextColor="#A4A4A4"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />

            {/* Payment Method Selector Card */}
            <Text style={styles.inputFieldMetaTitleLabel}>Payment Method</Text>
            <View style={styles.paymentMethodSelectionCompositeCardRow}>
              <View style={styles.miniMethodCardIndicatorIconBadge}>
                <Image
                  source={AppImages.card}
                  style={styles.miniBadgeCardIcon}
                />
              </View>
              <View style={styles.methodInfoTextBlockColumn}>
                <Text style={styles.paymentMethodPrimaryBrandTitleText}>
                  Credit Card
                </Text>
                <Text style={styles.paymentMethodMaskedValueMetaSubtext}>
                  Visa ending in 4242
                </Text>
              </View>
              {/* Custom Radio Outer Ring / Active Circle Element */}
              <View style={styles.radioInputComponentOuterRing}>
                <View style={styles.radioInputComponentActiveInnerCircle} />
              </View>
            </View>
          </View>

          {/* Modal Action Controls Stack */}
          <View style={styles.modalActionButtonsGroupBlockStack}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!isAmountEntered}
              style={[
                styles.modalConfirmActionTriggerButtonPrimary,
                !isAmountEntered && styles.modalConfirmDisabledButton,
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.modalConfirmActionTriggerButtonLabelText,
                  !isAmountEntered && styles.modalConfirmDisabledButtonText,
                ]}
              >
                Confirm Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.modalCancelActionTriggerButtonSecondary}
              onPress={onClose}
            >
              <Text style={styles.modalCancelActionTriggerButtonLabelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  makePaymentCardCanvas: {
    width: responsiveWidth(88),
    backgroundColor: AppColors.white,
    borderRadius: 32,
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(3.5),
    paddingTop: responsiveHeight(6.5),
    alignItems: 'center',
    position: 'relative',
  },
  topCardCircleBadge: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: responsiveWidth(9),
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -responsiveWidth(9),
  },
  badgeCardIcon: {
    width: responsiveWidth(7.5),
    height: responsiveWidth(7.5),
    resizeMode: 'contain',
    tintColor: '#33221F',
  },
  mainModalTitleHeadingText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: '#000000',
    marginBottom: responsiveHeight(0.8),
    textAlign: 'center',
  },
  subtextContextLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#666666',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
  },
  highlightedVendorNameString: {
    color: AppColors.secondary,
    fontWeight: '500',
  },
  formInteractionContainerSection: {
    width: '100%',
    marginBottom: responsiveHeight(3),
  },
  inputFieldMetaTitleLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    color: AppColors.black,
    marginBottom: responsiveHeight(1),
  },
  inlineAmountInputFieldWrapperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F6',
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4.5),
    height: responsiveHeight(6.2),
    marginBottom: responsiveHeight(2.2),
  },
  currencyPrefixSymbolInline: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: '#777777',
    marginRight: responsiveWidth(2),
  },
  numericValueInputElementField: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: AppColors.black,
    fontWeight: '400',
  },
  multilineTextInputBlockWrapperField: {
    backgroundColor: '#FAF7F6',
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(12),
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
    marginBottom: responsiveHeight(2.2),
  },
  paymentMethodSelectionCompositeCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F6',
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(8.5),
  },
  miniMethodCardIndicatorIconBadge: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 14,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
  },
  miniBadgeCardIcon: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    resizeMode: 'contain',
    tintColor: '#33221F',
  },
  methodInfoTextBlockColumn: {
    flex: 1,
  },
  paymentMethodPrimaryBrandTitleText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: AppColors.black,
  },
  paymentMethodMaskedValueMetaSubtext: {
    fontSize: responsiveFontSize(1.4),
    color: '#777777',
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
  radioInputComponentOuterRing: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    borderRadius: responsiveWidth(2.75),
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInputComponentActiveInnerCircle: {
    width: responsiveWidth(2.6),
    height: responsiveWidth(2.6),
    borderRadius: responsiveWidth(1.3),
    backgroundColor: AppColors.primary,
  },
  modalActionButtonsGroupBlockStack: {
    width: '100%',
  },
  modalConfirmActionTriggerButtonPrimary: {
    backgroundColor: '#FAF7F6',
    borderRadius: 20,
    paddingVertical: responsiveHeight(1.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: responsiveHeight(1.2),
    height: responsiveHeight(6.2),
  },
  modalConfirmDisabledButton: {
    backgroundColor: '#F5F5F5',
    borderColor: '#EFEFEF',
  },
  modalConfirmActionTriggerButtonLabelText: {
    color: AppColors.primary,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  modalConfirmDisabledButtonText: {
    color: '#8F94A0',
  },
  modalCancelActionTriggerButtonSecondary: {
    backgroundColor: '#FAF7F6',
    borderRadius: 20,
    paddingVertical: responsiveHeight(1.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3EAE8',
    height: responsiveHeight(6.2),
  },
  modalCancelActionTriggerButtonLabelText: {
    color: '#555555',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
});

export default PaymentModal;
