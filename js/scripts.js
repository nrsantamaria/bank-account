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
  } else if (this.currentAccount.withdraw > 0){
    this.currentAccount.balance -= this.currentAccount.withdraw;
    this.currentAccount.withdraw = 0;
  }
};

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
      $("#output").text(newBank.currentAccount.name + ", your account balance is: $" + newBank.currentAccount.balance);
      $("#deposit-amount").val("");
      $("#withdrawal-amount").val("")
    });
  });
});
