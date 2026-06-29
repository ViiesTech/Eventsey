import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomDropdown from '../../components/CustomDropdown'; // Updated layout package path
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';

const Tasks = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form States
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [setReminder, setSetReminder] = useState(false);

  // Data structure mapped specifically for label/value framework definitions
  const categoriesData = [
    { label: 'Guests', value: 'Guests' },
    { label: 'Photography', value: 'Photography' },
    { label: 'Venue', value: 'Venue' },
    { label: 'Catering', value: 'Catering' },
    { label: 'Décor / Flowers', value: 'Décor / Flowers' },
    { label: 'Attire', value: 'Attire' },
  ];

  const [tasksData, setTasksData] = useState([
    {
      id: '1',
      title: 'Book venue',
      date: '2025-11-15',
      category: 'Venue',
      completed: true,
    },
    {
      id: '2',
      title: 'Send invitations',
      date: '2025-11-20',
      category: 'Guests',
      completed: false,
    },
    {
      id: '3',
      title: 'Order wedding cake',
      date: '2025-11-25',
      category: 'Catering',
      completed: false,
    },
    {
      id: '4',
      title: 'Finalize guest list',
      date: '2025-11-18',
      category: 'Guests',
      completed: true,
    },
    {
      id: '5',
      title: 'Book photographer',
      date: '2025-11-22',
      category: 'Photography',
      completed: false,
    },
  ]);

  const filteredTasks = tasksData.filter(task => {
    if (activeTab === 'Upcoming') return !task.completed;
    if (activeTab === 'Completed') return task.completed;
    return true;
  });

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: String(tasksData.length + 1),
      title: taskTitle,
      date: taskDate || '2025-11-30',
      category: selectedCategory ? selectedCategory : 'General',
      completed: false,
    };

    setTasksData([...tasksData, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDate('');
    setSelectedCategory(null);
    setSetReminder(false);
    setIsModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        {/* Header Row */}
        <View style={styles.headerActionRow}>
          <View style={styles.emptyHeaderLeft} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.homeIconCircle}
            onPress={() => navigation.navigate('Home')}
          >
            <Image source={AppImages.home} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>

        {/* Title and Progress Bar Section */}
        <View style={styles.titleBlockContainer}>
          <Text style={styles.screenMainTitleText}>To-Do List</Text>
          <Text style={styles.screenSubTitleText}>
            Track your wedding tasks
          </Text>

          <Text style={styles.progressStatusText}>
            You've completed 40 % of your tasks!
          </Text>
          <View style={styles.progressBarOuterTrack}>
            <View style={[styles.progressBarFilledInner, { width: '40%' }]} />
          </View>
        </View>

        {/* Custom Segmented Tab Bar */}
        <View style={styles.segmentedTabWrapperBar}>
          {['All', 'Upcoming', 'Completed'].map(tab => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              style={[
                styles.tabFilterButton,
                activeTab === tab && styles.tabFilterButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabButtonLabelText,
                  activeTab === tab && styles.tabButtonLabelTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scrollable Tasks List Feed */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listScrollArea}
        >
          {filteredTasks.map(task => (
            <View key={task.id} style={styles.taskCardItemRow}>
              <View style={styles.checkboxStateClickTarget}>
                {task.completed ? (
                  <View style={styles.checkedStateBoxSquare}>
                    <Text style={styles.checkmarkIndicatorSymbol}>✓</Text>
                  </View>
                ) : (
                  <View style={styles.uncheckedStateCircleOutline} />
                )}
              </View>

              <View style={styles.taskContentDetailsColumn}>
                <Text
                  style={[
                    styles.taskTitleCoreText,
                    task.completed && styles.taskTitleTextCompleted,
                  ]}
                >
                  {task.title}
                </Text>

                <View style={styles.taskMetaBadgeInlineGroupRow}>
                  <View style={styles.calendarIconWrapperMini}>
                    <Image
                      source={AppImages.calendar}
                      style={styles.miniCalendarIcon}
                    />
                  </View>
                  <Text style={styles.taskDateStringLabelText}>
                    {task.date}
                  </Text>

                  <View style={styles.categoryCapsuleBadgeWrapper}>
                    <Text style={styles.categoryCapsuleBadgeText}>
                      {task.category}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.notificationBellActionCircle}
              >
                <Image source={AppImages.bell} style={styles.miniBellIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Floating Action Button (FAB) -> Opens Modal */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.floatingActionButtonCapsule}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.fabPlusSymbolSignIcon}>+</Text>
        </TouchableOpacity>

        {/* ================= ADD NEW TASK MODAL ================= */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={resetForm}
        >
          <TouchableWithoutFeedback onPress={resetForm}>
            <View style={styles.modalOverlayContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalCardMainContainer}>
                  <Text style={styles.modalHeadingTitle}>Add New Task</Text>

                  {/* Task Title Input */}
                  <TextInput
                    style={styles.modalInputFieldInstance}
                    placeholder="Task title"
                    placeholderTextColor="#9E9E9E"
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                  />

                  {/* Date Input */}
                  <TextInput
                    style={styles.modalInputFieldInstance}
                    placeholder="mm/dd/yyyy"
                    placeholderTextColor="#9E9E9E"
                    value={taskDate}
                    onChangeText={setTaskDate}
                  />

                  {/* INTEGRATED: Mapped Native Wrapper Dropdown Instance */}
                  <View style={styles.dropdownInputComponentSpacer}>
                    <CustomDropdown
                      data={categoriesData}
                      value={selectedCategory}
                      placeholder="Category"
                      dropdowBgColor={'#FAF9F6'}
                      onChange={item => setSelectedCategory(item.value)}
                    />
                  </View>

                  {/* Set Reminder Checkbox Row */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.checkboxActionContainerRowLabel}
                    onPress={() => setSetReminder(!setReminder)}
                  >
                    <View
                      style={[
                        styles.reminderCheckboxBoxFrame,
                        setReminder && styles.reminderCheckboxBoxFrameActive,
                      ]}
                    >
                      {setReminder && (
                        <Text style={styles.reminderCheckmarkSymbolElement}>
                          ✓
                        </Text>
                      )}
                    </View>
                    <Text style={styles.reminderLabelMetaText}>
                      Set reminder
                    </Text>
                  </TouchableOpacity>

                  {/* Modal Control Action Trigger Buttons */}
                  <View style={styles.modalActionButtonsClusterRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.modalSecondaryActionDismissButton}
                      onPress={resetForm}
                    >
                      <Text style={styles.modalSecondaryActionButtonText}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.modalPrimaryActionSubmitButton}
                      onPress={handleAddTask}
                    >
                      <Text style={styles.modalPrimaryActionButtonText}>
                        Add Task
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(5),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    marginTop: responsiveHeight(1.5),
    position: 'relative',
  },
  headerActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  emptyHeaderLeft: {
    width: responsiveWidth(10),
  },
  homeIconCircle: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: '50%',
    height: '50%',
    tintColor: AppColors.primary,
    resizeMode: 'contain',
  },
  titleBlockContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  screenMainTitleText: {
    fontSize: responsiveFontSize(3.4),
    fontWeight: '800',
    color: AppColors.black,
  },
  screenSubTitleText: {
    fontSize: responsiveFontSize(2.0),
    color: '#444444',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  progressStatusText: {
    fontSize: responsiveFontSize(1.75),
    color: '#333333',
    fontWeight: '500',
    marginTop: responsiveHeight(2.5),
    marginBottom: responsiveHeight(1),
  },
  progressBarOuterTrack: {
    width: '100%',
    height: responsiveHeight(1.1),
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFilledInner: {
    height: '100%',
    backgroundColor: AppColors.secondary,
    borderRadius: 10,
  },
  segmentedTabWrapperBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 14,
    padding: responsiveWidth(1.2),
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2.5),
  },
  tabFilterButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  tabFilterButtonActive: {
    backgroundColor: AppColors.primary,
  },
  tabButtonLabelText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#555555',
  },
  tabButtonLabelTextActive: {
    color: AppColors.black,
  },
  listScrollArea: {
    paddingBottom: responsiveHeight(16),
  },
  taskCardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 18,
    padding: responsiveWidth(4.5),
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: responsiveHeight(1.8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  checkboxStateClickTarget: {
    marginRight: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedStateCircleOutline: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    backgroundColor: 'transparent',
  },
  checkedStateBoxSquare: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkmarkIndicatorSymbol: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '800',
    color: AppColors.black,
    marginTop: -2,
  },
  taskContentDetailsColumn: {
    flex: 1,
  },
  taskTitleCoreText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.6),
  },
  taskTitleTextCompleted: {
    color: '#8A7D8A',
  },
  taskMetaBadgeInlineGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIconWrapperMini: {
    width: 16,
    height: 16,
    marginRight: responsiveWidth(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniCalendarIcon: {
    width: '100%',
    height: '100%',
    tintColor: AppColors.secondary,
    resizeMode: 'contain',
  },
  taskDateStringLabelText: {
    fontSize: responsiveFontSize(1.45),
    color: '#666666',
    fontWeight: '500',
    marginRight: responsiveWidth(3),
  },
  categoryCapsuleBadgeWrapper: {
    backgroundColor: AppColors.secondary,
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(0.3),
    borderRadius: 6,
  },
  categoryCapsuleBadgeText: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.black,
    fontWeight: '600',
  },
  notificationBellActionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF2F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  miniBellIcon: {
    width: '50%',
    height: '50%',
    tintColor: AppColors.primary,
    resizeMode: 'contain',
  },
  floatingActionButtonCapsule: {
    position: 'absolute',
    bottom: responsiveHeight(9.5),
    right: responsiveWidth(5),
    backgroundColor: AppColors.primary,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  fabPlusSymbolSignIcon: {
    fontSize: responsiveFontSize(3.5),
    color: AppColors.black,
    fontWeight: '400',
    marginTop: -2,
  },

  /* ================= MODAL OVERLAYS & CONTROLS ================= */
  modalOverlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(30, 35, 44, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCardMainContainer: {
    backgroundColor: AppColors.white,
    width: '86%',
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(2.5),
    paddingBottom: responsiveHeight(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeadingTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  modalInputFieldInstance: {
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    height: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.75),
    color: AppColors.black,
    marginBottom: responsiveHeight(1.8),
  },
  dropdownInputComponentSpacer: {
    marginBottom: responsiveHeight(1.8),
  },
  checkboxActionContainerRowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(0.5),
  },
  reminderCheckboxBoxFrame: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#777777',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(2.5),
  },
  reminderCheckboxBoxFrameActive: {
    borderColor: AppColors.black,
  },
  reminderCheckmarkSymbolElement: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.black,
    fontWeight: '700',
    marginTop: -2,
  },
  reminderLabelMetaText: {
    fontSize: responsiveFontSize(1.65),
    color: '#444444',
    fontWeight: '500',
  },
  modalActionButtonsClusterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSecondaryActionDismissButton: {
    backgroundColor: '#F5ECE3',
    borderRadius: 12,
    flex: 1,
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  modalSecondaryActionButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
  modalPrimaryActionSubmitButton: {
    backgroundColor: AppColors.secondary,
    borderRadius: 12,
    flex: 1,
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPrimaryActionButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
});

export default Tasks;
