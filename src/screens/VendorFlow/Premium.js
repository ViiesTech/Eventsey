import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const Premium = ({ navigation }) => {
  // State to track the currently selected plan (Defaulted to 'Gold')
  const [selectedPlan, setSelectedPlan] = useState('Basic');

  const handleSubscribe = planName => {
    console.log(`Subscribing to plan: ${planName}`);
    // Yahan aap payment gateway ya logic integrate kar sakte hain
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        <LogoHeader
          goBack
          title="Upgrade to Premium 🚀"
          starImage={true}
          headerHeight={28}
          description="Unlock powerful features to grow your business"
        />

        {/* MARKETING METRICS BANNER */}
        <View style={styles.tealMarketingBanner}>
          <View style={styles.bannerRow}>
            <Image source={AppImages.stats} style={styles.bannerTrendingIcon} />
            <View style={styles.bannerTextColumn}>
              <Text style={styles.bannerLabelText}>Premium vendors get</Text>
              <Text style={styles.bannerHighlightText}>
                3x more job requests
              </Text>
              <Text style={styles.bannerLabelText}>on average</Text>
            </View>
          </View>
        </View>

        {/* PLAN ONE: BASIC (FREE) CARD */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedPlan('Basic')}
          style={[
            styles.planCardFrame,
            selectedPlan === 'Basic' && styles.activePeachBorder,
          ]}
        >
          <View style={styles.planHeaderRow}>
            <View style={styles.planIconWrapper}>
              <Image source={AppImages.basic} style={styles.planIconText} />
            </View>
            <View style={styles.planTitleColumn}>
              <Text style={styles.planSubLabel}>Basic</Text>
              <Text style={styles.planMainPrice}>Free</Text>
            </View>
          </View>

          <View style={styles.featuresListBlock}>
            <Text style={styles.featureTickLine}>✓ Up to 5 active jobs</Text>
            <Text style={styles.featureTickLine}>✓ Basic profile listing</Text>
            <Text style={styles.featureTickLine}>✓ Standard support</Text>
            <Text style={styles.featureTickLine}>✓ View job requests</Text>
            <Text style={styles.featureCrossLine}>✕ Limited visibility</Text>
            <Text style={styles.featureCrossLine}>✕ No priority support</Text>
          </View>

          <TouchableOpacity style={styles.disabledCurrentPlanButton} disabled>
            <Text style={styles.disabledCurrentPlanButtonText}>
              Current Plan
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* PLAN TWO: GOLD (MOST POPULAR) CARD */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedPlan('Gold')}
          style={[
            styles.planCardFrame,
            selectedPlan === 'Gold' && styles.activePeachBorder,
          ]}
        >
          {/* Most Popular Badge Banner */}
          <View style={styles.mostPopularBadgeTag}>
            <Text style={styles.mostPopularBadgeText}>⭐ Most Popular</Text>
          </View>

          <View style={styles.planHeaderRow}>
            <View style={styles.planIconWrapper}>
              <Image source={AppImages.gold} style={styles.planIconText} />
            </View>
            <View style={styles.planTitleColumn}>
              <Text style={styles.planSubLabel}>Gold</Text>
              <View style={styles.priceRowStructure}>
                <Text style={styles.planMainPrice}>$19</Text>
                <Text style={styles.priceDurationText}>/30 days</Text>
              </View>
            </View>
          </View>

          <View style={styles.featuresListBlock}>
            <Text style={styles.featureTickLine}>✓ Unlimited active jobs</Text>
            <Text style={styles.featureTickLine}>
              ✓ Boosted profile visibility
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Priority customer support
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Featured in search results
            </Text>
            <Text style={styles.featureTickLine}>✓ Advanced analytics</Text>
            <Text style={styles.featureTickLine}>
              ✓ Custom service packages
            </Text>
          </View>

          <TouchableOpacity
            style={styles.tealActionSubscribeButton}
            onPress={() => handleSubscribe('Gold')}
            activeOpacity={0.85}
          >
            <Text style={styles.tealActionSubscribeButtonText}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* PLAN THREE: PLATINUM CARD */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedPlan('Platinum')}
          style={[
            styles.planCardFrame,
            selectedPlan === 'Platinum' && styles.activePeachBorder,
          ]}
        >
          <View style={styles.planHeaderRow}>
            <View style={styles.planIconWrapper}>
              <Image source={AppImages.premium} style={styles.planIconText} />
            </View>
            <View style={styles.planTitleColumn}>
              <Text style={styles.planSubLabel}>Platinum</Text>
              <View style={styles.priceRowStructure}>
                <Text style={styles.planMainPrice}>$449</Text>
                <Text style={styles.priceDurationText}>/90 days</Text>
              </View>
            </View>
          </View>

          <View style={styles.featuresListBlock}>
            <Text style={styles.featureTickLine}>✓ Everything in Gold</Text>
            <Text style={styles.featureTickLine}>✓ Top search ranking</Text>
            <Text style={styles.featureTickLine}>
              ✓ Priority leads notification
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Dedicated Eventsey account manager
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Premium badge on profile
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Early access to new features
            </Text>
            <Text style={styles.featureTickLine}>
              ✓ Marketing promotion support
            </Text>
          </View>

          <TouchableOpacity
            style={styles.coralActionSubscribeButton}
            onPress={() => handleSubscribe('Platinum')}
            activeOpacity={0.85}
          >
            <Text style={styles.coralActionSubscribeButtonText}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(9),
    borderRadius: 36,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  tealMarketingBanner: {
    backgroundColor: AppColors.secondary,
    borderRadius: 16,
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2),
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTrendingIcon: {
    width: 34,
    height: 34,
    tintColor: AppColors.black,
    marginRight: responsiveWidth(4),
    resizeMode: 'contain',
  },
  bannerTextColumn: {
    flex: 1,
  },
  bannerLabelText: {
    fontSize: responsiveFontSize(1.45),
    color: '#333333',
    fontWeight: '500',
  },
  bannerHighlightText: {
    fontSize: responsiveFontSize(1.85),
    fontWeight: '700',
    color: '#000000',
    marginVertical: responsiveHeight(0.2),
  },
  planCardFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2.5),
    paddingBottom: responsiveHeight(2.5),
    marginBottom: responsiveHeight(3),
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  activePeachBorder: {
    borderColor: '#FF9E80',
    borderWidth: 2,
  },
  mostPopularBadgeTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFB399',
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.6),
  },
  mostPopularBadgeText: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: '700',
    color: '#000000',
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  planIconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  planIconText: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  planTitleColumn: {
    flex: 1,
  },
  planSubLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#666666',
    fontWeight: '500',
  },
  priceRowStructure: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planMainPrice: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: AppColors.black,
  },
  priceDurationText: {
    fontSize: responsiveFontSize(1.4),
    color: '#777777',
    marginLeft: responsiveWidth(1),
  },
  featuresListBlock: {
    marginBottom: responsiveHeight(2.5),
  },
  featureTickLine: {
    fontSize: responsiveFontSize(1.5),
    color: '#2D3748',
    fontWeight: '500',
    lineHeight: 24,
    marginVertical: responsiveHeight(0.3),
  },
  featureCrossLine: {
    fontSize: responsiveFontSize(1.5),
    color: '#A0AEC0',
    lineHeight: 24,
    marginVertical: responsiveHeight(0.3),
  },
  disabledCurrentPlanButton: {
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    height: responsiveHeight(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  disabledCurrentPlanButtonText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: '#718096',
  },
  tealActionSubscribeButton: {
    backgroundColor: AppColors.secondary,
    borderRadius: 12,
    height: responsiveHeight(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tealActionSubscribeButtonText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: '#000000',
  },
  coralActionSubscribeButton: {
    backgroundColor: '#F5B0A3',
    borderRadius: 12,
    height: responsiveHeight(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  coralActionSubscribeButtonText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: '#000000',
  },
});

export default Premium;
