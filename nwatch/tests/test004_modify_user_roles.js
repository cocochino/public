module.exports = {

  'Prerequisit: Login' : function (browser) {
   // !!!DON'T FORGET TO REMOVE PASSWORD!!!
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
  
  'Prerequisit: Go to Test User' : function (browser) {
    var userAdminUrl = 'https://[replace]/users#/';
    var testUser = 'Vanilla'
    
    browser
      //Jump to user screen
      .url(userAdminUrl)
      //Wait for test user's profile link, then click it
      .waitForElementVisible('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)', 10000)
      .click('tr.UserCard:nth-child(2) > td:nth-child(2) > a:nth-child(1)')
      .waitForElementVisible('.UserGeneralInfo__name', 10000)
      .assert.containsText('.UserGeneralInfo__name', testUser, "Test user exists")
  },

  'Test: Edit User Role' : function (browser) {
   /* Test: Edit existing test user role.
      Assumes: Logged in as Admin user, on User Admin page
   */
    var expected = 'Manager'
    var testRoleName = 'Manager'
    browser
      //Click on Action menu, select Edit User Info
      .waitForElementVisible('.users_menu__title', 10000)
      .click('#usersRoot > div > div.UsersPage__header > div > div > div.users_menu__head--closed')
      .waitForElementVisible('li.users_menu__list_item:nth-child(1) > button:nth-child(1)', 3000)
      .click('li.users_menu__list_item:nth-child(1) > button:nth-child(1)')
      //Set new role
      .waitForElementVisible('.Select-arrow', 3000)
      .click('.Select-arrow') 
      .click('#user-role-selection')
      .setValue('#user-role-selection', [testRoleName, browser.Keys.ENTER])
      .click('button.button:nth-child(1)')
      .pause(3000) // Grace period... my browser is really slow.
      //Verify new value
      .expect.element('div.UserGeneralInfo__column:nth-child(1) > dd:nth-child(2)').text.to.equal(expected);
   },
   
  'Cleanup' : function (browser) {
    var originalRole = 'User'
    
    browser
      .waitForElementVisible('.users_menu__title', 10000)
      .click('#usersRoot > div > div.UsersPage__header > div > div > div.users_menu__head--closed')
      .waitForElementVisible('li.users_menu__list_item:nth-child(1) > button:nth-child(1)', 3000)
      .click('li.users_menu__list_item:nth-child(1) > button:nth-child(1)')
      //Set new role
      .waitForElementVisible('.Select-arrow', 3000)
//      .click('.Select-arrow') 
      .click('#user-role-selection')
      .setValue('#user-role-selection', [originalRole , browser.Keys.ENTER])
      .click('button.button:nth-child(1)')
      .pause(3000) // Grace period... my browser is really slow.
      .end()
  }    
};