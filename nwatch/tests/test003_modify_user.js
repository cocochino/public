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

  
  'Test: Edit User Name - Basic' : function (browser) {
   /* Test: Smoke. Edit existing test user name.
      Assumes: Logged in as Admin user, on User Admin page
   */
    var newTestUserName = 'O\'Vanilla'
    browser
      //Click on Action menu, select Edit User Info
      .waitForElementVisible('.users_menu__title', 10000)
      .click('#usersRoot > div > div.UsersPage__header > div > div > div.users_menu__head--closed')
      .waitForElementVisible('li.users_menu__list_item:nth-child(1) > button:nth-child(1)', 3000)
      .click('li.users_menu__list_item:nth-child(1) > button:nth-child(1)')
      //Erase existing name and set new one
      .waitForElementVisible('#edit-user-input--name', 10000)
      .clearValue('#edit-user-input--name')
      .click('#edit-user-input--name')
      .setValue('#edit-user-input--name', newTestUserName)
      .click('button.button:nth-child(1)')
      .pause(3000) // Grace period... my browser is really slow.
      .waitForElementVisible('.UserGeneralInfo__name', 10000)
      .assert.containsText('.UserGeneralInfo__name', newTestUserName, "Checking if test user name has been modified.")
  },
  
  'Test: Edit User Name: Non-Standard' : function (browser) {
   /* Test: Regression. Edit existing test user name.
      Assumes: Logged in as Admin user, on User Admin page
   */

    var reallyLong = '前章で述べたのは、イギリスに於けるクリスマス祝祭に就ての幾つかの一般的な觀察であつたが、今わたしは誘惑を感ずるままに、その具體的な例證として田舍で過したクリスマスの逸話を記してみたいと思ふ。讀者が之を讀まれる際に、わたしから辭を低くして切に願ふのは、いかめしい叡知はしばらく忘れて純一な休日氣分にひたり、愚かしきことをも寛き心を以て許し、ひたすら愉樂をのみ求められんことである。十二月のこと、ヨークシャを旅行の途上、長い道程をわたしは驛傳馬車の御厄介になつたが、それはクリスマスの前日であつた。馬車は内も外も乘客が混みあつてゐた。';
    var xssString = '<body onload=alert(\'test1\')>'
    
  　 var testNames = ['テスト', '1234567890', 'OR 1=1', reallyLong, xssString];

      for(i = 0; i < testNames.length; i++){
          browser
          //Click on Action menu, select Edit User Info
          .waitForElementVisible('.users_menu__title', 10000)
          .click('#usersRoot > div > div.UsersPage__header > div > div > div.users_menu__head--closed')
          .waitForElementVisible('li.users_menu__list_item:nth-child(1) > button:nth-child(1)', 3000)
          .click('li.users_menu__list_item:nth-child(1) > button:nth-child(1)')
          //Erase existing name and set new name - normal one
          .waitForElementVisible('#edit-user-input--name', 10000)
          .clearValue('#edit-user-input--name')
          .click('#edit-user-input--name')
          .setValue('#edit-user-input--name', testNames[i])
          .click('button.button:nth-child(1)')
          .pause(3000) // Grace period... my browser is really slow.
          .waitForElementVisible('.UserGeneralInfo__name', 10000)
          .assert.containsText('.UserGeneralInfo__name', testNames[i], "Checking if test user name has been modified.")
      }
  } ,
    
  'Cleanup' : function (browser) {
    var testUser = 'Vanilla'
    
    browser
      .waitForElementVisible('.users_menu__title', 10000)
      .click('#usersRoot > div > div.UsersPage__header > div > div > div.users_menu__head--closed')
      .waitForElementVisible('li.users_menu__list_item:nth-child(1) > button:nth-child(1)', 3000)
      .click('li.users_menu__list_item:nth-child(1) > button:nth-child(1)')
      .waitForElementVisible('#edit-user-input--name', 10000)
      .clearValue('#edit-user-input--name')
      .click('#edit-user-input--name')
      .setValue('#edit-user-input--name', testUser)
      .click('button.button:nth-child(1)')
      .pause(3000) // Grace period... my browser is really slow.
      .waitForElementVisible('.UserGeneralInfo__name', 10000)
      .end()
  }  
      
};