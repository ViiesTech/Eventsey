import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';

const vendorCategories = ['All', 'Venues', 'Photography', 'Decor', 'Catering'];

const mockVendors = [
  {
    id: 1,
    name: 'Bella Vista Garden',
    category: 'Venues',
    rating: '4.9',
    price: '$8,500',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    name: 'Eternal Frame Photo',
    category: 'Photography',
    rating: '4.8',
    price: '$2,400',
    location: 'Beverly Hills, CA',
  },
  {
    id: 3,
    name: 'Bloom & Petals Decor',
    category: 'Decor',
    rating: '4.7',
    price: '$1,800',
    location: 'Pasadena, CA',
  },
  {
    id: 4,
    name: 'Gourmet Banquet Catering',
    category: 'Catering',
    rating: '4.9',
    price: '$45/person',
    location: 'Santa Monica, CA',
  },
  {
    id: 5,
    name: 'Golden Hour Cinematography',
    category: 'Photography',
    rating: '5.0',
    price: '$3,200',
    location: 'Malibu, CA',
  },
];

const UserVendors = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = mockVendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === 'All' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScreenWrapper scrollable backgroundColor={AppColors.white}>
      <View style={styles.container}>
        <Text style={styles.screenHeader}>Find Vendors</Text>

        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search vendors, services..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Categories Tab Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
          contentContainerStyle={styles.categoryRowContent}
        >
          {vendorCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Vendors List */}
        <View style={styles.vendorsList}>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <View key={vendor.id} style={styles.vendorCard}>
                <View style={styles.vendorHeader}>
                  <View style={styles.vendorNameBlock}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text style={styles.vendorLocation}>{vendor.location}</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingStar}>★</Text>
                    <Text style={styles.ratingText}>{vendor.rating}</Text>
                  </View>
                </View>

                <View style={styles.vendorDivider} />

                <View style={styles.vendorFooter}>
                  <View>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceValue}>{vendor.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.contactBtn}>
                    <Text style={styles.contactBtnText}>Inquire</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noVendorsText}>No vendors found</Text>
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
    color: '#1A1A1A',
    marginBottom: responsiveHeight(2),
  },
  searchWrapper: {
    backgroundColor: '#F5EFEA',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  searchInput: {
    fontSize: responsiveFontSize(1.7),
    color: '#1A1A1A',
    padding: 0,
  },
  categoryRow: {
    maxHeight: responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },
  categoryRowContent: {
    alignItems: 'center',
    paddingRight: responsiveWidth(6),
  },
  categoryPill: {
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(1),
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: responsiveWidth(2),
  },
  categoryPillActive: {
    backgroundColor: AppColors.primary,
  },
  categoryText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: '#4A4A4A',
  },
  categoryTextActive: {
    color: AppColors.white,
  },
  vendorsList: {
    width: '100%',
  },
  vendorCard: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 20,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vendorNameBlock: {
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  vendorName: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  vendorLocation: {
    fontSize: responsiveFontSize(1.5),
    color: '#8E8E93',
    marginTop: responsiveHeight(0.4),
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.5),
    alignItems: 'center',
  },
  ratingStar: {
    color: '#FFB800',
    fontSize: responsiveFontSize(1.6),
    marginRight: responsiveWidth(1),
  },
  ratingText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
    color: '#FFB800',
  },
  vendorDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: responsiveHeight(1.8),
  },
  vendorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
  },
  priceValue: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: responsiveHeight(0.2),
  },
  contactBtn: {
    backgroundColor: '#FDF7F5',
    borderWidth: 1,
    borderColor: AppColors.primary,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(1),
  },
  contactBtnText: {
    color: AppColors.primary,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.6),
  },
  noVendorsText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(5),
  },
});

export default UserVendors;
