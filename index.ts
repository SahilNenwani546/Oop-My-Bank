#! /usr/bin/env node

import inquirer from "inquirer"

// Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    diposit(amount: number): void
    checkBalance(): void
}

// Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

// Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount
        console.log(`Withdrawal of ${amount} successful. Remaining balance: ${this.balance}`);
    }else{
        console.log("Insufficient balance.");
    }
}
//  Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charge if more than $100 is diposited
    } this.balance += amount;
    console.log(`Deposite of $${amount} successful. Remaining balance: ${this.balance}`);
}

// check balance
checkBalance(): void {
    console.log(`Current balamce $${this.balance}`);
}
}

// Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;

    }
    
}

// Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

// Create customers
const customers: Customer[] = [
    new Customer ("Sahil", "Nenwani", "Male", 21, 3162762290, accounts[0]),
    new Customer ("Ali", "Ajmeri", "Male", 20, 3330762290, accounts[1]),
    new Customer ("Nimra", "Khan", "Female", 23, 3412762290, accounts[2])
]

// Function to interact with bank account
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt(
            {
                name: "accountNumber",
                type: "number",
                message: "Enter Your account number:"

            }
        )

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt(
                [
                    {
                        name: "select",
                        type: "list",
                        message: "Select an operation",
                        choices: ["Deposit", "Wihdraw", "Check Balane", "Exit"]
                    }
                ]
            );
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt(
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }
                    )
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Wihdraw":
                        const withdrawAmount = await inquirer.prompt(
                            {
                                name: "amount",
                                type: "number",
                                message: "Enter the amount to withdraw:"
                            }
                        )
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                case "Check Balane":
                        customer.account.checkBalance();
                        break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
    
            }
            
        } else {
            console.log("Invalid account number. Please try again.");
            
        }
    } while(true)
}

service()
