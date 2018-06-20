import { Component } from '@angular/core';
import { UserService } from '../service/data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'money-tranfer',
    templateUrl: 'money-tranfer.component.html',
    styleUrls: ['money-tranfer.component.scss']
})
export class MoneyTranferComponent {
    accountList = [{
        accountID: "",
        customerID: 0,
        bankCode: "",
        accountType: "",
        statusCode: "",
        balanceAmount: 0,
        createDTM: "",
        updateDTM: "",
        accountName:""
    }]
    moneyTranferLocal = {
        FeeAmount: 0,
        SubmitAmount: 0,
        NetAmount: 0,
        SendAccountID: '',
        SendBankCode: '020',
        ReceiveAccountID: '',
        ReceiveBankCode: '020'
    }
    FormSendTranferPromptpay={
        type:"",
        value:"",
        FeeAmount: 0,
        amount:0,
        NetAmount: 0,
        SendAccountID:"",
        SendBankCode: '020'
    }
    moneyTransferPromptpay={
        FeeAmount: 0,
        SubmitAmount: 0,
        NetAmount: 0,
        SendAccountID: '',
        SendBankCode: '020',
        ReceiveAccountID: '',
        ReceiveBankCode: '',
        AIPID:''
    }
    RawPromptpay = {
        Status: "",
        BankCode: "",
        AccountID: "",
        AccountName: "",
        IDValue: "",
        IDType: "",
        AIPID: "",
        RegisterDTM: ""
    }
    checkAccountNotExist = false;
    checkAccountPromptpayExist = false;
    checkAmountBalanceInsufficient = false;
    checkMoneyTranferLocalSuccess=false;
    checkMoneyTranferLocalFail=false;
    checkMoneyTranferPromptpaySuccess=false;
    checkMoneyTranferPromptpayFail=false;
    UserBalanceAmount = 0;
    // deleteSet={
    //     IDType : 'mobile',
    //     IDValue : ''
    // }
    constructor(private service: UserService) {
        this.service.getAllAccountID()
            .then((resp) => {
                let data = resp
                this.accountList = resp;
                console.log(resp)
            })

    }
    openmodal(page) {
        document.getElementById(page).click();
    }
    transfer() {
        this.checkAccountNotExist = false;
        this.checkAmountBalanceInsufficient = false;
        this.moneyTranferLocal.NetAmount = (+this.moneyTranferLocal.FeeAmount) + (+this.moneyTranferLocal.SubmitAmount);
        this.service.checkBalanceAmount(this.moneyTranferLocal.SendAccountID)
        .then((resp) => {
            this.UserBalanceAmount = resp.balanceAmount;
            this.checkBalanceAndAccount()
        })
        
        console.log("test1" + !this.checkAccountNotExist);
        console.log("test2" + !this.checkAmountBalanceInsufficient);
    }
    transferPromptpay(){
        this.checkAccountPromptpayExist = false;
        this.checkAmountBalanceInsufficient = false;
        this.FormSendTranferPromptpay.NetAmount = (+this.FormSendTranferPromptpay.FeeAmount) + (+this.FormSendTranferPromptpay.amount);
        this.service.checkBalanceAmount(this.FormSendTranferPromptpay.SendAccountID)
        .then((resp) => {
            this.UserBalanceAmount = resp.balanceAmount;
            this.checkBalanceAndAccountPromptPay()
        })
    }
    checkBalanceAndAccountPromptPay() {
        this.service.getRawPromptpay(this.FormSendTranferPromptpay.type,this.FormSendTranferPromptpay.value)
            .then((resp) => {
                this.RawPromptpay=resp;
                //console.log(this.RawPromptpay);
                this.moneyTransferPromptpay={
                    FeeAmount: 0,
                    SubmitAmount: this.FormSendTranferPromptpay.amount,
                    NetAmount: (+this.FormSendTranferPromptpay.amount)+(+this.FormSendTranferPromptpay.FeeAmount),
                    SendAccountID: this.FormSendTranferPromptpay.SendAccountID,
                    SendBankCode: '020',
                    ReceiveAccountID: this.RawPromptpay.AccountID,
                    ReceiveBankCode: this.RawPromptpay.BankCode,
                    AIPID:this.RawPromptpay.AIPID             
                }
                console.log(this.moneyTransferPromptpay);
                
                if(this.UserBalanceAmount<this.FormSendTranferPromptpay.NetAmount||this.FormSendTranferPromptpay.NetAmount==0){
                    this.checkAmountBalanceInsufficient=true;
                }                    
                else if(resp == null) {
                    this.checkAccountPromptpayExist = true;
                }
                if(!this.checkAmountBalanceInsufficient && !this.checkAccountPromptpayExist){
                    this.openmodal("confirmTransferPrompt");
                }
            }).catch((err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.status);
                if(this.UserBalanceAmount<this.FormSendTranferPromptpay.NetAmount||this.FormSendTranferPromptpay.NetAmount==0){
                    this.checkAmountBalanceInsufficient=true;
                }
                this.checkAccountPromptpayExist = true;
            })
    }
    checkBalanceAndAccount() {
        this.service.checkExistAccount(this.moneyTranferLocal.ReceiveAccountID)
            .then((resp) => {
                if(this.UserBalanceAmount<this.moneyTranferLocal.NetAmount||this.moneyTranferLocal.NetAmount==0){
                    this.checkAmountBalanceInsufficient=true;
                }                    
                else if(resp == null) {
                    this.checkAccountNotExist = true;
                }
                if(!this.checkAmountBalanceInsufficient && !this.checkAccountNotExist){
                    this.openmodal("confirmTransfer");
                }
            }).catch((err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.status);
                if(this.UserBalanceAmount<this.moneyTranferLocal.NetAmount||this.moneyTranferLocal.NetAmount==0){
                    this.checkAmountBalanceInsufficient=true;
                }  
                this.checkAccountNotExist = true;
            })
    }
    moneytransfer() {
        this.checkMoneyTranferLocalSuccess=false;
        this.checkMoneyTranferLocalFail=false;
        this.service.moneyTranferLocal(this.moneyTranferLocal)
            .then((resp) => {
                let data = resp
                console.log(resp)
                this.checkMoneyTranferLocalSuccess=true;
                // this.openmodal("transferStatus")
            })
            .catch((err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.status);
                this.checkMoneyTranferLocalFail=true;
            })
    }
    moneytransferPromptpay() {
        this.service.moneyTranferPromtpay(this.moneyTransferPromptpay)
            .then((resp) => {
                let data = resp
                console.log(resp)
                this.checkMoneyTranferPromptpaySuccess=true;
                // this.openmodal("transferStatus")
            })
            .catch((err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.status);
                this.checkMoneyTranferPromptpaySuccess=true;
            })
    }

}
