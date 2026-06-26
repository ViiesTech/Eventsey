import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import JobCard from '../../components/JobCard';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const VendorJobs = ({ navigation }) => {
  // Screen active status dynamic selection track karne ke liye state
  const [activeTab, setActiveTab] = useState('New Jobs');

  const tabs = [
    { id: '1', title: 'New Jobs', count: 2 },
    { id: '2', title: 'Accepted', count: 1 },
    { id: '3', title: 'Completed', count: 1 },
  ];

  // Mock Data mockup as per core UI screenshot configurations
  const jobsData = [
    {
      id: '1',
      category: 'Catering',
      price: '$3,500',
      statusTag: 'New Job',
      client: 'Sarah & John',
      date: 'June 15, 2024',
      location: 'Grand Hotel Ballroom',
      description:
        'Full catering service for 150 guests, including appetizers, main course, and desserts.',
      type: 'New Jobs',
    },
    {
      id: '2',
      category: 'Photography',
      price: '$2,800',
      statusTag: 'New Job',
      client: 'Emily & Mike',
      date: 'July 22, 2024',
      location: 'Beach Resort',
      description: '8-hour wedding photography coverage with 2 photographers.',
      type: 'New Jobs',
    },
    {
      id: '3',
      category: 'Makeup Artist',
      price: '$850',
      statusTag: 'Completed',
      client: 'Emily & Mike',
      date: 'July 22, 2024',
      location: 'Beach Resort',
      description: '8-hour wedding photography coverage with 2 photographers.',
      type: 'Completed',
    },
    {
      id: '4',
      category: 'Decorations',
      price: '$4,200',
      statusTag: 'Accepted',
      client: 'Emily & Mike',
      date: 'July 22, 2024',
      location: 'Beach Resort',
      description: '8-hour wedding photography coverage with 2 photographers.',
      type: 'Accepted',
    },
  ];

  // Filter functionality implementation based on selected category tab
  const filteredJobs = jobsData.filter(job => job.type === activeTab);

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        <LogoHeader
          title="Job Requests"
          description="Manage your bookings"
          headerHeight={21}
        />

        {/* Segment Filter Selection Tabs Bar Component */}
        <View style={styles.segmentControlBarContainer}>
          {tabs.map(tab => {
            const isSelected = activeTab === tab.title;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.segmentTabTile,
                  isSelected && styles.activeTabTileFill,
                ]}
                onPress={() => setActiveTab(tab.title)}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.tabLabelText,
                    isSelected && styles.activeTabLabelText,
                  ]}
                >
                  {tab.title} ({tab.count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* List Flow Rendering Stream via Imported JobCard Item Modules */}
        <FlatList
          data={filteredJobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <JobCard item={item} />} // Custom Component Used Here
          scrollEnabled={false}
          contentContainerStyle={styles.listStreamContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyStateMessage}>
                No job request listings here.
              </Text>
            </View>
          }
        />
      </View>
      <View style={{ height: responsiveHeight(4) }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white || '#FFFFFF',
    marginHorizontal: responsiveWidth(6),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  segmentControlBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    padding: responsiveWidth(1.2),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  segmentTabTile: {
    flex: 1,
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTabTileFill: {
    backgroundColor: AppColors.primary,
  },
  tabLabelText: {
    fontSize: responsiveFontSize(1.4),
    color: '#5A5A5A',
    fontWeight: '500',
  },
  activeTabLabelText: {
    color: AppColors.white,
    fontWeight: '700',
  },
  listStreamContainer: {
    marginTop: responsiveHeight(1.5),
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(6),
  },
  emptyStateMessage: {
    fontSize: responsiveFontSize(1.6),
    color: '#9E9E9E',
  },
});

export default VendorJobs;
