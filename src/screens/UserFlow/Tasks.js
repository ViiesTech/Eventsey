import React, { useState } from 'react';
import { View, StyleSheet, FlatOpacity, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';

const initialTasks = [
  { id: 1, title: 'Book Wedding Venue', category: 'Venue', done: true },
  {
    id: 2,
    title: 'Choose Photographer & Videographer',
    category: 'Media',
    done: true,
  },
  { id: 3, title: 'Finalize Guest List', category: 'Guests', done: false },
  { id: 4, title: 'Select Wedding Dress', category: 'Attire', done: false },
  {
    id: 5,
    title: 'Taste and Choose Catering Menu',
    category: 'Catering',
    done: false,
  },
  {
    id: 6,
    title: 'Design and Send Invitations',
    category: 'Invites',
    done: false,
  },
  {
    id: 7,
    title: 'Hire Florist & Setup Decor theme',
    category: 'Decor',
    done: false,
  },
];

const UserTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const doneCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((doneCount / tasks.length) * 100);

  return (
    <ScreenWrapper scrollable backgroundColor={AppColors.white}>
      <View style={styles.container}>
        <Text style={styles.screenHeader}>My Checklist</Text>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Planning Progress</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <Text style={styles.progressSubText}>
            {doneCount} of {tasks.length} tasks completed
          </Text>
        </View>

        {/* Task List */}
        <View style={styles.listContainer}>
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskItem, task.done && styles.taskItemDone]}
              activeOpacity={0.8}
              onPress={() => toggleTask(task.id)}
            >
              {/* Checkbox circle/square */}
              <View
                style={[styles.checkbox, task.done && styles.checkboxChecked]}
              >
                {task.done && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <View style={styles.taskTextContainer}>
                <Text
                  style={[styles.taskTitle, task.done && styles.taskTitleDone]}
                >
                  {task.title}
                </Text>
                <Text style={styles.taskCategory}>{task.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  progressCard: {
    backgroundColor: '#FDF7F5',
    borderWidth: 1,
    borderColor: '#FBE8E2',
    borderRadius: 20,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(3),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  progressTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#8A6861',
  },
  progressPercent: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.primary,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EFEFEF',
    width: '100%',
    marginBottom: responsiveHeight(1.2),
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.primary,
  },
  progressSubText: {
    fontSize: responsiveFontSize(1.5),
    color: '#8E8E93',
  },
  listContainer: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  taskItemDone: {
    backgroundColor: '#FAF9F8',
    borderColor: '#EFEFEF',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#BC8D84',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(4),
  },
  checkboxChecked: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  checkmark: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  taskCategory: {
    fontSize: responsiveFontSize(1.4),
    color: '#BC8D84',
    marginTop: responsiveHeight(0.4),
    fontWeight: '500',
  },
});

export default UserTasks;
