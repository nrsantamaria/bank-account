//Business Logic
function Bank(account1, account2) {
  this.currentAccount;
  this.account = [account1, account2];
};

function Account(name, balance) {
  this.name = name;
  this.balance = balance;
  this.deposit;
  this.withdraw;
};

Bank.prototype.updateBalance = function (){
  if (this.currentAccount.deposit > 0){
    this.currentAccount.balance += this.currentAccount.deposit;
    this.currentAccount.deposit = 0;
  } else if (this.currentAccount.withdraw > 0 && this.currentAccount.withdraw <= this.currentAccount.balance){
    this.currentAccount.balance -= this.currentAccount.withdraw;
    this.currentAccount.withdraw = 0;
  }
};

Account.prototype.resetDepositWithdraw = function () {
  $("#deposit-amount").val("");
  $("#withdrawal-amount").val("")
}

Account.prototype.resetNameIntialDeposit = function() {
  $("input#name").val("");
  $("#initial-deposit").val("");
}

//UI Logic
$(document).ready(function() {
  $("#bank-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("input#name").val();
    var initialDepositInput = parseInt($("#initial-deposit").val());
    var accountOne = new Account(nameInput, initialDepositInput);
    var accountTwo = new Account(nameInput, initialDepositInput);
    var newBank = new Bank(accountOne, accountTwo);
    newBank.currentAccount = accountOne;

    //Initial display in output section
    $("#output").show();
    $("#output").text(newBank.currentAccount.name + ", your account balance is: $" + newBank.currentAccount.balance);
    $("#deposit-or-withdraw").show();

    //Click function to update account balance
    $("#change-balance").click(function(){
      var depositInput = parseInt($("#deposit-amount").val());
      var withdrawInput = parseInt($("#withdrawal-amount").val());
      newBank.currentAccount.deposit = depositInput;
      newBank.currentAccount.withdraw = withdrawInput;
      newBank.updateBalance();

      // Insufficient Funds
      if (newBank.currentAccount.withdraw > newBank.currentAccount.balance){
        $("#error-message").text("Insufficient funds! Please enter a value less than your balance.");
      } else if (newBank.currentAccount.withdraw <= newBank.currentAccount.balance) {
        $("#error-message").text("");
      }

      //Update display in output section
      $("#output").text(newBank.currentAccount.name + ", your account balance is: $" + newBank.currentAccount.balance);
      accountOne.resetDepositWithdraw(); // clear fields
    }); // change balance click close

    accountOne.resetNameIntialDeposit(); //clear fields
  }); // submit form close
}); // doc ready close
