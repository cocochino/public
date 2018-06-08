module.exports = {

  'Prerequisit: Login' : function (browser) {

    var loginUrl = 'https://[replace]/login'
    var userName = '[replace: adminUserEmail]'
    var userPwd = '[replace: AdminUserPwd]'
   
    browser
      //Login as Admin user
      .url(loginUrl)
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('#session_login', 10000)
      .setValue('#session_login', userName)
      .waitForElementVisible('#session_password', 10000)
      .setValue('#session_password', userPwd)
      .click('#session_submit')
      .waitForElementVisible('body', 60000)
      // Pre-test sanity check... Accout menu exists
      .expect.element('#account_menu').to.be.present
  },

  'Test: Create User' : function (browser) {
   /* Test: Create a test user with default role for name/role testing.
      Assumes: Logged in as Admin user
   */
    var userAdminUrl = 'https://[replace]/users#/'
    var testUser = 'Vanilla'
    var testEmail = 'Vanilla@test.test'
    
    browser
      //Jump to user screen
      .url(userAdminUrl)
      .waitForElementVisible('.users-page__add_user_action', 10000)
      .click('#usersRoot > div > div.UsersPage__header > div.users-page__add_user_action > button')
      .waitForElementVisible('#add-user-input--name', 10000)
      .setValue('#add-user-input--name', testUser)
      .setValue('#add-user-input--email', testEmail)
      .click('div.form__actions.form__group--buttons > button.button.button--solid-blue')
      .pause(3000)
      .waitForElementVisible('#ContactsSort', 10000) 
      .click('#ContactsSort > option:nth-child(1)') //Sort by First Created
      //Check: A new user is visible on screen.
      .waitForElementVisible('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)', 10000)
  },
  
  'Test: Verify User' : function (browser) {
   /* Test: Verify Test user attributes.
      Assumes: Logged in as Admin user
   */
    var userAdminUrl = 'https://[replace]/users#/'
    var testUser = 'Vanilla'
    var testEmail = 'Vanilla@test.test'
    
    browser
      .url(userAdminUrl)
      .waitForElementVisible('#ContactsSort', 10000)
      .click('#ContactsSort > option:nth-child(1)')
      //Click on Test user's profile link
      .waitForElementVisible('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)', 10000)
      //Check: Test user name and email address
      .waitForElementVisible('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)', 10000)
      .assert.containsText('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)', testUser, "Checking if test user has been created")
      .assert.containsText('tr.UserCard:nth-child(2) > td:nth-child(2) > div:nth-child(2)', testEmail)
  },
  
  'Cleanup' : function (browser) {
    
    browser
      .end()
  }  
  
};