import time
import pandas as pd
import numpy as np

CITY_DATA = {'chicago': 'chicago.csv',
             'new york city': 'new_york_city.csv',
             'washington': 'washington.csv'}
MONTHS = ['All', 'January', 'February', 'March', 'April', 'May', 'June']
W_DAYS = ['All', 'Monday', 'Tuesday', 'Tednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
msg_invalid = '   *** INVALID SELECTION. Try again. ***'
msg_confirm = '   Press Y/y if this is OK:  '


def get_filters():
    """
    Asks user to specify a city, month, and day to analyze.

    Returns:
        (str) city - name of the city to analyze
        (str) month - name of the month to filter by, or "all" to apply no month filter
        (str) day - name of the day of week to filter by, or "all" to apply no day filter
    """
    print('Hello! Let\'s explore some US bikeshare data!')
    # Get user input for city (chicago, new york city, washington).
    while True:
        city = (input("Pleae select city [Chicago, New York City, Washington]:  ")).lower()
        if city in CITY_DATA.keys():
            print('   City name selected: {}'.format(city.title()))
            if (input(msg_confirm)).lower() == 'y':
                break
        else:
            print(msg_invalid)

    # Get user input for month (all, january, february, ... , june)
    while True:
        month = (input("Pleae select month {}: ".format(MONTHS))).title()
        if month in MONTHS:
            print('   Month selected: {}'.format(month))
            if (input(msg_confirm)).lower() == 'y':
                break
        else:
            print(msg_invalid)

    # Get user input for day of week (all, monday, tuesday, ... sunday)
    while True:
        day = (input("Pleae select day of week {}: ".format(W_DAYS))).title()
        if day in W_DAYS:
            print('   Day of Week selected: {}'.format(day))
            if (input(msg_confirm)).lower() == 'y':
                break
        else:
            print(msg_invalid)

    print('-' * 40)
    return city, month, day


def load_data(city, month, day):
    """
    Load city data csv and apply filters - none, month, and/or day.

    Returns:
        (dataframe) df - name of the city to analyze. All lower case.
    """
    df = pd.read_csv(CITY_DATA[city])
    # Time related stats are Start Time based.
    df['Start Time'] = pd.to_datetime(df['Start Time'])
    df['month'] = df['Start Time'].dt.month
    df['day_of_week'] = df['Start Time'].dt.weekday_name
    df['hour'] = df['Start Time'].dt.hour

    if month != 'All':
        df = df[df['month'] == MONTHS.index(month)]
    if day != 'All':
        df = df[df['day_of_week'] == day]

    return df


def time_stats(df, month, day):
    """Displays statistics on the most frequent times of travel."""
    print('\nCalculating The Most Frequent Times of Travel...\n')
    start_time = time.time()
    # Display the most common month only if all months are selected
    if month == 'All':
        # ppl_month = (df['month'].mode()).item()
        # print("The most common month: {}.".format(MONTHS[ppl_month]))
        print("Most common month:")
        for idx, month_nm in df['month'].mode().iteritems():
            print("   {} ".format(MONTHS[month_nm]))
    else:
        print("Skipping common month data")

    # Display the most common day of week only if all days are selected
    if day == 'All':
        # ppl_day = (df['day_of_week'].mode()).item()
        # print("The most common day of week: {}.".format(ppl_day))
        print("Most common day of week:")
        for idx, day_nm in df['day_of_week'].mode().iteritems():
            print("   {} ".format(day_nm))
    else:
        print("Skipping common day of week data")

    # Display the most common start hour
    # ppl_hour = (df['hour'].mode()).item()
    # print("The most common hour: {}.".format(ppl_hour))
    print("Most common hour (0 - 24):")
    for idx, hours in df['hour'].mode().iteritems():
        print("   {} ".format(hours))

    print("\nThis took %s seconds." % (time.time() - start_time))
    print('-' * 40)


def station_stats(df):
    """Displays statistics on the most popular stations and trip."""

    print('\nCalculating The Most Popular Stations and Trip...\n')
    start_time = time.time()

    # Display most commonly used start station
    print("Most common start station:")
    for idx, station in df['Start Station'].mode().iteritems():
        print("   {} ".format(station))

    # Display most commonly used end station
    print("Most common end station:")
    for idx, station in df['End Station'].mode().iteritems():
        print("   {} ".format(station))

    # Display most frequent combination of start station and end station trip
    stations_grouped = df.groupby(['Start Station', 'End Station'])
    stations_ordered = stations_grouped.count()['Start Time'].sort_values(ascending=False)
    ppl_combo = stations_ordered.idxmax()  # most common start-end
    print("Most common travel path:\n   from {} to {}".format(ppl_combo[0], ppl_combo[1]))

    print("\nThis took %s seconds." % (time.time() - start_time))
    print('-' * 40)


def trip_duration_stats(df):
    """Displays statistics on the total and average trip duration."""

    print('\nCalculating Trip Duration...\n')
    start_time = time.time()

    # Display total travel time
    trip_duration = (df['Trip Duration'].sum())  # total travel time
    print("Total travel time: {} seconds.".format(trip_duration))

    # Display mean travel time
    trip_average = (df['Trip Duration'].mean())  # average travel time
    print("Average travel time (rounded): {0:.2f} seconds.".format(trip_average))

    print("\nThis took %s seconds." % (time.time() - start_time))
    print('-' * 40)


def user_stats(df, city):
    """Displays statistics on bikeshare users."""

    print('\nCalculating User Stats...\n')
    start_time = time.time()

    # Display counts of user types
    user_types = df['User Type'].dropna().unique()
    user_type_grouped = df.groupby(['User Type'])
    for i in range(len(user_types)):
        print("User type = {}, count = {}".
              format(user_types[i], user_type_grouped.count()['Start Time'][i]))

    if city != 'washington':
        # Display counts of gender
        gender_types = df['Gender'].dropna().unique()  # Drop NaN data
        gender_type_grouped = df.groupby(['Gender'])
        for i in range(len(gender_types)):
            print("Gender = {}, count = {}".format(
                gender_types[i], gender_type_grouped.count()['Start Time'][i]))

        # Display earliest, most recent, and most common year of birth
        print("The ealiest year of birth: {}.".format(int(df['Birth Year'].min())))
        print("The most recent year of birth: {}.".format(int(df['Birth Year'].max())))
        print("The most common year of birth:")
        for idx, year in df['Birth Year'].mode().iteritems():
            print("   {} ".format(int(year)))
    else:
        print("No gender and birth year data available for Washington.")

    print("\nThis took %s seconds." % (time.time() - start_time))
    print('-' * 40)


def main():
    while True:
        city, month, day = get_filters()
        # city, month, day = 'washington', 'May', 'All'
        df = load_data(city, month, day)
        time_stats(df, month, day)
        station_stats(df)
        trip_duration_stats(df)
        user_stats(df, city)
        restart = input('\nWould you like to restart? Enter yes or no.\n')
        if restart.lower() != 'yes':
            break


if __name__ == "__main__":
    main()
