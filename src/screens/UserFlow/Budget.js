import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
// import AddExpenseModal from '../../components/Modals/AddExpenseModal'; // <-- Imported External Modal Component
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';
import AddExpenseModal from '../../components/Modals/AddExpenseModal';

const Budget = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // Modal display execution hook state

  const [budgetSummary, setBudgetSummary] = useState({
    percentageSpent: 67,
    totalEstimated: '$ 41,500',
    totalActual: '$ 40,200',
  });

  const [expensesBreakdown, setExpensesBreakdown] = useState([
    {
      id: '1',
      category: 'Venue',
      estimated: '$ 15,000',
      actual: '$ 14,500',
      difference: '- $ 500',
      isPositive: false,
    },
    {
      id: '2',
      category: 'Catering',
      estimated: '$ 12,000',
      actual: '$ 13,200',
      difference: '+ $ 1200',
      isPositive: true,
    },
    {
      id: '3',
      category: 'Photography',
      estimated: '$ 3,500',
      actual: '$ 3,500',
      difference: '- $ 0',
      isPositive: false,
    },
    {
      id: '4',
      category: 'Decoration',
      estimated: '$ 5,000',
      actual: '$ 4,200',
      difference: '- $ 800',
      isPositive: false,
    },
    {
      id: '5',
      category: 'Attire',
      estimated: '$ 4,000',
      actual: '$ 4,800',
      difference: '+ $ 800',
      isPositive: true,
    },
    {
      id: '6',
      category: 'Music/DJ',
      estimated: '$ 2,000',
      actual: '$ 0',
      difference: '- $ 2000',
      isPositive: false,
    },
  ]);

  const handleInsertNewExpenseData = newExpense => {
    // Difference calculation injection logic block
    const estNum =
      parseFloat(newExpense.estimated.replace(/[^0-9.-]+/g, '')) || 0;
    const actNum = parseFloat(newExpense.actual.replace(/[^0-9.-]+/g, '')) || 0;
    const diffVal = actNum - estNum;

    const configuredItem = {
      id: String(expensesBreakdown.length + 1),
      category: newExpense.category,
      estimated: newExpense.estimated,
      actual: newExpense.actual,
      difference: diffVal >= 0 ? `+ $ ${diffVal}` : `- $ ${Math.abs(diffVal)}`,
      isPositive: diffVal > 0,
    };

    setExpensesBreakdown([...expensesBreakdown, configuredItem]);
  };

  return (
    <ScreenWrapper>
      <View style={styles.masterFlexContainer}>
        {/* Navigation Action Bar Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Header Identity Section */}
        <View style={styles.identityTitleAndBadgeRow}>
          <View style={styles.textColumnContext}>
            <Text style={styles.mainTitleHeadingText}>Budget Tracker</Text>
            <Text style={styles.subTitleDescriptionText}>
              Keep your expenses in check
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserFlow', { screen: 'Home' })}
            style={styles.badgeIconContainer}
          >
            <Image
              source={AppImages.home}
              style={styles.headerRightBadgeIconSymbol}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentLayoutContainer}
        >
          {/* Main Visual Progress Donut Box Card Panel */}
          <View style={styles.overviewCardSurface}>
            <View style={styles.circularProgressVisualFramePlaceholder}>
              <Progress.Circle
                size={responsiveWidth(36)}
                progress={budgetSummary.percentageSpent / 100}
                thickness={7}
                color={AppColors.secondary}
                unfilledColor="#F0F0F0"
                borderWidth={0}
                strokeCap="round"
              />
              <View style={styles.innerCircularLabelContent}>
                <Text style={styles.percentageMetricText}>
                  {budgetSummary.percentageSpent} %
                </Text>
                <Text style={styles.spentStatusSubtextLabel}>Spent</Text>
              </View>
            </View>

            <View style={styles.metaEstimatedActualFlexRow}>
              <View style={styles.metaCenterContentColumn}>
                <Text style={styles.metaColumnCategoryLabel}>Estimated</Text>
                <Text style={styles.metaColumnValueAmountText}>
                  {budgetSummary.totalEstimated}
                </Text>
              </View>
              <View
                style={[
                  styles.metaCenterContentColumn,
                  { borderLeftWidth: 1, borderLeftColor: '#F0F0F0' },
                ]}
              >
                <Text style={styles.metaColumnCategoryLabel}>Actual</Text>
                <Text
                  style={[
                    styles.metaColumnValueAmountText,
                    { color: AppColors.secondary },
                  ]}
                >
                  {budgetSummary.totalActual}
                </Text>
              </View>
            </View>
          </View>

          {/* Breakdown Section Heading Container */}
          <Text style={styles.breakdownSectionLabelTitle}>
            Expenses Breakdown
          </Text>

          {/* Categorized Stack Grid Collection */}
          {expensesBreakdown.map(item => (
            <View key={item.id} style={styles.breakdownRowContainerSurfaceCard}>
              <Text style={styles.expenseItemHeadingCategoryTitle}>
                {item.category}
              </Text>

              <View style={styles.expenseItemMetricsRowDistribution}>
                <View style={styles.metricColumnBlock}>
                  <Text style={styles.metricLabelTinyText}>Estimated</Text>
                  <Text style={styles.metricValueAmountText}>
                    {item.estimated || '-'}
                  </Text>
                </View>

                <View style={styles.metricColumnBlock}>
                  <Text style={styles.metricLabelTinyText}>Actual</Text>
                  <Text style={styles.metricValueAmountText}>
                    {item.actual}
                  </Text>
                </View>

                <View
                  style={[styles.metricColumnBlock, { alignItems: 'flex-end' }]}
                >
                  <Text style={styles.metricLabelTinyText}>Difference</Text>
                  <Text
                    style={[
                      styles.metricValueAmountText,
                      {
                        color: item.isPositive
                          ? AppColors.primary
                          : AppColors.secondary,
                      },
                    ]}
                  >
                    {item.difference}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Bottom Fixed Sticky Meta Summary Footer Bar */}
          <View style={styles.bottomFooterMetaRowBar}>
            <Text style={styles.footerSummaryLabelLeft}>Total Budget</Text>
            <Text style={styles.footerSummaryValueRight}>
              {budgetSummary.totalActual} / {budgetSummary.totalEstimated}
            </Text>
          </View>
        </ScrollView>

        {/* Floating Interactive Action Controller (FAB) */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.floatingActionPrimaryTriggerButton}
          onPress={() => setModalVisible(true)} // <-- Set visible state true to display dynamic modal overlay
        >
          <Text style={styles.fabPlusSymbolSignIcon}>+</Text>
        </TouchableOpacity>

        {/* External Overlay Modal Initialization Instance Component */}
        <AddExpenseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddExpense={handleInsertNewExpenseData}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  masterFlexContainer: {
    flex: 1,
    paddingTop: responsiveHeight(4),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(9),
    marginBottom: responsiveHeight(2.5),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    paddingRight: responsiveWidth(4),
  },
  backIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  backButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
  identityTitleAndBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(9),
    marginBottom: responsiveHeight(3.5),
  },
  textColumnContext: {
    flex: 1,
  },
  mainTitleHeadingText: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '800',
    color: AppColors.black,
  },
  subTitleDescriptionText: {
    fontSize: responsiveFontSize(1.8),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  badgeIconContainer: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 30,
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightBadgeIconSymbol: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  scrollContentLayoutContainer: {
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(10),
  },
  overviewCardSurface: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingVertical: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F9F9F9',
    marginBottom: responsiveHeight(4),
  },
  circularProgressVisualFramePlaceholder: {
    width: responsiveWidth(36),
    height: responsiveWidth(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(3),
  },
  innerCircularLabelContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageMetricText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '800',
    color: AppColors.black,
  },
  spentStatusSubtextLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#A2848D',
    fontWeight: '500',
    marginTop: responsiveHeight(0.2),
  },
  metaEstimatedActualFlexRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
  metaCenterContentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaColumnCategoryLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#A2848D',
    fontWeight: '500',
    marginBottom: responsiveHeight(0.6),
  },
  metaColumnValueAmountText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
    color: AppColors.black,
  },
  breakdownSectionLabelTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '800',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  breakdownRowContainerSurfaceCard: {
    backgroundColor: AppColors.white,
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2.2),
    marginBottom: responsiveHeight(2.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  expenseItemHeadingCategoryTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
    color: AppColors.black,
    marginBottom: responsiveHeight(1.5),
  },
  expenseItemMetricsRowDistribution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricColumnBlock: {
    flex: 1,
  },
  metricLabelTinyText: {
    fontSize: responsiveFontSize(1.4),
    color: '#A2848D',
    fontWeight: '500',
    marginBottom: responsiveHeight(0.4),
  },
  metricValueAmountText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
  },
  bottomFooterMetaRowBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(1),
    paddingBottom: responsiveHeight(2),
  },
  footerSummaryLabelLeft: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '500',
  },
  footerSummaryValueRight: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  floatingActionPrimaryTriggerButton: {
    position: 'absolute',
    bottom: responsiveHeight(4),
    right: responsiveWidth(7),
    backgroundColor: AppColors.primary,
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  fabPlusSymbolSignIcon: {
    fontSize: responsiveFontSize(3.2),
    color: AppColors.black,
    fontWeight: '400',
    marginTop: Platform.OS === 'ios' ? -2 : 0,
  },
});

export default Budget;
