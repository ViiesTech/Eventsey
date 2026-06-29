import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Text from '../CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';

const PaymentDetailsModal = ({
  isVisible,
  onClose,
  onConfirm,
  details = {
    vendor: 'Glamour Makeup Artists',
    service: 'Makeup',
    invoice: 'INV-003',
    totalAmount: '$500',
  },
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayContainer}>
        <View style={styles.paymentDetailsCardCanvas}>
          <Text style={styles.detailsModalTitleHeadingText}>
            Payment Details
          </Text>

          {/* Summary Invoice Info Block Grid */}
          <View style={styles.invoiceSummaryDetailsBeigeTableCard}>
            <View style={styles.tableRowEntrySpaceBetweenAlignment}>
              <Text style={styles.tableRowMetaFieldLabelKeyText}>Vendor</Text>
              <Text style={styles.tableRowValueDataValueText}>
                {details.vendor}
              </Text>
            </View>

            <View style={styles.tableRowEntrySpaceBetweenAlignment}>
              <Text style={styles.tableRowMetaFieldLabelKeyText}>Service</Text>
              <Text style={styles.tableRowValueDataValueText}>
                {details.service}
              </Text>
            </View>

            <View style={styles.tableRowEntrySpaceBetweenAlignment}>
              <Text style={styles.tableRowMetaFieldLabelKeyText}>Invoice</Text>
              <Text style={styles.tableRowValueDataValueText}>
                {details.invoice}
              </Text>
            </View>

            <View style={styles.tableHorizontalDividingRuleLine} />

            <View
              style={[
                styles.tableRowEntrySpaceBetweenAlignment,
                { marginBottom: 0 },
              ]}
            >
              <Text style={styles.totalAmountLabelLargeStringKeyText}>
                Total Amount
              </Text>
              <Text style={styles.totalAmountValueLargeStringValueText}>
                {details.totalAmount}
              </Text>
            </View>
          </View>

          {/* Payment Method Placeholder Field Track */}
          <Text style={styles.inputFieldMetaTitleLabel}>Payment Method</Text>
          <View style={styles.paymentDetailsEmptyMethodPlaceholderCapsule} />

          {/* Inline Action Layout Panel Controls */}
          <View style={styles.detailsModalActionButtonsGroupInlineRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.detailsModalCancelTriggerButtonHalfWidth}
              onPress={onClose}
            >
              <Text style={styles.detailsModalCancelTriggerButtonLabelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.detailsModalConfirmTriggerButtonHalfWidth}
              onPress={onConfirm}
            >
              <Text style={styles.detailsModalConfirmTriggerButtonLabelText}>
                Confirm Payment
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
  paymentDetailsCardCanvas: {
    width: responsiveWidth(88),
    backgroundColor: AppColors.white,
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
  },
  detailsModalTitleHeadingText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(3),
  },
  invoiceSummaryDetailsBeigeTableCard: {
    backgroundColor: '#FAF7F4',
    borderRadius: 20,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(3),
  },
  tableRowEntrySpaceBetweenAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.6),
  },
  tableRowMetaFieldLabelKeyText: {
    fontSize: responsiveFontSize(1.8),
    color: '#8C8C8C',
    fontWeight: '400',
  },
  tableRowValueDataValueText: {
    fontSize: responsiveFontSize(1.8),
    color: AppColors.black,
    fontWeight: '500',
  },
  tableHorizontalDividingRuleLine: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: responsiveHeight(1.2),
  },
  totalAmountLabelLargeStringKeyText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: AppColors.black,
  },
  totalAmountValueLargeStringValueText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.primary,
  },
  inputFieldMetaTitleLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(1.2),
  },
  paymentDetailsEmptyMethodPlaceholderCapsule: {
    backgroundColor: '#FAF7F6',
    borderWidth: 1,
    borderColor: 'rgba(238, 193, 200, 0.3)',
    borderRadius: 20,
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(3.5),
  },
  detailsModalActionButtonsGroupInlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsModalCancelTriggerButtonHalfWidth: {
    width: '46%',
    backgroundColor: '#F5F2EE',
    borderRadius: 15,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsModalCancelTriggerButtonLabelText: {
    color: '#555555',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  detailsModalConfirmTriggerButtonHalfWidth: {
    width: '50%',
    backgroundColor: AppColors.secondary,
    borderRadius: 15,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsModalConfirmTriggerButtonLabelText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
});

export default PaymentDetailsModal;
