import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';

const initialGuests = [
  { id: 1, name: 'John Doe', status: 'Attending', relation: 'Groom Family' },
  { id: 2, name: 'Sarah Smith', status: 'Attending', relation: 'Bride Friend' },
  { id: 3, name: 'Alex Johnson', status: 'Pending', relation: 'Bride Family' },
  { id: 4, name: 'David Lee', status: 'Declined', relation: 'Groom Friend' },
  { id: 5, name: 'Emily Davis', status: 'Attending', relation: 'Groom Family' },
  { id: 6, name: 'Michael Brown', status: 'Pending', relation: 'Bride Friend' },
  {
    id: 7,
    name: 'Jessica Wilson',
    status: 'Attending',
    relation: 'Bride Family',
  },
];

const UserGuests = () => {
  const [guests, setGuests] = useState(initialGuests);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const attendingCount = guests.filter(g => g.status === 'Attending').length;
  const pendingCount = guests.filter(g => g.status === 'Pending').length;
  const declinedCount = guests.filter(g => g.status === 'Declined').length;

  const filteredGuests = guests.filter(guest => {
    const matchesFilter =
      activeFilter === 'All' || guest.status === activeFilter;
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ScreenWrapper scrollable backgroundColor={AppColors.white}>
      <View style={styles.container}>
        <Text style={styles.screenHeader}>Guest Management</Text>

        {/* RSVP Stats Grid */}
        <View style={styles.statsCard}>
          <Text style={styles.statsCardTitle}>RSVP Status Summary</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statItem, { borderLeftColor: '#4CAF50' }]}>
              <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
                {attendingCount}
              </Text>
              <Text style={styles.statLabel}>Attending</Text>
            </View>
            <View style={[styles.statItem, { borderLeftColor: '#FFC107' }]}>
              <Text style={[styles.statNumber, { color: '#FFC107' }]}>
                {pendingCount}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={[styles.statItem, { borderLeftColor: '#F44336' }]}>
              <Text style={[styles.statNumber, { color: '#F44336' }]}>
                {declinedCount}
              </Text>
              <Text style={styles.statLabel}>Declined</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search guests by name..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {['All', 'Attending', 'Pending', 'Declined'].map(filter => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    isActive && styles.filterTabTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Guest List */}
        <View style={styles.guestList}>
          {filteredGuests.length > 0 ? (
            filteredGuests.map(guest => {
              let statusBg = '#E8F5E9';
              let statusText = '#2E7D32';

              if (guest.status === 'Pending') {
                statusBg = '#FFFDE7';
                statusText = '#F57F17';
              } else if (guest.status === 'Declined') {
                statusBg = '#FFEBEE';
                statusText = '#C62828';
              }

              return (
                <View key={guest.id} style={styles.guestCard}>
                  <View style={styles.guestDetails}>
                    <Text style={styles.guestName}>{guest.name}</Text>
                    <Text style={styles.guestRelation}>{guest.relation}</Text>
                  </View>
                  <View
                    style={[styles.statusBadge, { backgroundColor: statusBg }]}
                  >
                    <Text
                      style={[styles.statusBadgeText, { color: statusText }]}
                    >
                      {guest.status}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.noGuestsText}>
              No guests match the criteria
            </Text>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(12),
  },
  screenHeader: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  statsCard: {
    backgroundColor: '#FDF7F5',
    borderWidth: 1,
    borderColor: '#FBE8E2',
    borderRadius: 20,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(3),
  },
  statsCardTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: '#8A6861',
    marginBottom: responsiveHeight(1.5),
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    borderLeftWidth: 3,
    paddingLeft: responsiveWidth(3),
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
  },
  statLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    fontWeight: '500',
  },
  searchWrapper: {
    backgroundColor: '#F5EFEA',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  searchInput: {
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
    padding: 0,
  },
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2.5),
  },
  filterTab: {
    paddingVertical: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(3.5),
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  filterTabActive: {
    backgroundColor: AppColors.primary,
  },
  filterTabText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#4A4A4A',
  },
  filterTabTextActive: {
    color: AppColors.white,
  },
  guestList: {
    width: '100%',
  },
  guestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  guestDetails: {
    flex: 1,
  },
  guestName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
  },
  guestRelation: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    marginTop: responsiveHeight(0.4),
  },
  statusBadge: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
  },
  noGuestsText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(4),
  },
});

export default UserGuests;
