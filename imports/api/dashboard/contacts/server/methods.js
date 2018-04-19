import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


const findNicName = (val) => {
    return new Promise(function(resolve, reject) {
        let res = Meteor.users.find({ 'profileExt.nicName': val }).fetch();
        return resolve(res)
    });
}

Meteor.methods({
    'contact.byNicName.get'(val) {
        check(val, String);
        let res = Meteor.users.find({ 'profileExt.nicName': val }).fetch();
        let filtred = {};
        if(res.length === 0) return null;
        filtred.nicName = val;
        filtred.fullName = res[0].profileExt.fullName;
        filtred._id = res[0]._id;
        return filtred
    },

    'contact.bid.add' (contId) {
        check(contId, String);
        if(contId === this.userId) return null;
    
        let doc1 = {};
        let oldDoc1 = Meteor.users.find({ _id: this.userId }).fetch();
        let oldContacts1= oldDoc1[0].contacts;

        if(!oldContacts1) {
            doc1.bids = [contId];
        } else if(!oldContacts1.bids) {
            doc1.bids = [contId];
        } else if(oldContacts1.bids.indexOf(contId) === -1){
            doc1.bids = [ ...oldContacts1.bids, contId ];
        }

        let newDoc1 = { ...oldDoc1[0].contacts, ...doc1 };
        Meteor.users.update(this.userId , { $set: { contacts: newDoc1 } });
        
        let doc2 = {};
        let oldDoc2 = Meteor.users.find({ _id: contId }).fetch();
        let oldContacts2 = oldDoc2[0].contacts;
               
        if(!oldContacts2) {
            doc2.offers = [this.userId];
        } else if(!oldContacts2.offers) {   
            doc2.offers = [this.userId];
        } else if(oldContacts2.offers.indexOf(this.userId) === -1){
            doc2.offers = [ ...oldContacts2.offers, this.userId ];
        }

        let newDoc2 = { ...oldDoc2[0].contacts, ...doc2 };
        Meteor.users.update(contId, { $set: { contacts: newDoc2 } });

    },
  
    'contactsData.get' (idArr) {
        check(idArr, [String]);
        if(!idArr.length) return [];
       
        let res = [];
        const docArr = Meteor.users.find({ _id: { $in : idArr } }).fetch();
        docArr.map((item, i) => {
            const prof = item.profileExt;
            res[i]= {};
            res[i]._id = item._id;
            if(prof.nicName) res[i].nicName = prof.nicName;
            if(prof.fullName) res[i].fullName = prof.fullName;
            if(prof.avatarSrc) res[i].avatarSrc = prof.avatarSrc;
        });
        
        return res
    },
  
    'contact.bid.del' (contId) {
        check(contId, String);
        if(contId === this.userId) return null;

        let oldDoc1 = Meteor.users.find({ _id: this.userId }).fetch();
        let oldBids= oldDoc1[0].contacts.bids;
        let newBids= _.without(oldBids, contId);
        
        Meteor.users.update(this.userId , { $set: { 'contacts.bids': newBids } });

        let oldDoc2 = Meteor.users.find({ _id: contId }).fetch();
        let oldOffers= oldDoc2[0].contacts.offers;
        let newOffers = _.without(oldOffers, this.userId);
        
        Meteor.users.update(contId, { $set: { 'contacts.offers': newOffers } });

        return 'delete'
    },
  
    'contact.offers.accept' (contId) {
        check(contId, String);
        if(contId === this.userId) return null;
        
        let oldDoc1 = Meteor.users.find({ _id: contId }).fetch();

        let oldBids1= oldDoc1[0].contacts.bids;
        let newBids1= _.without(oldBids1, this.userId);
        Meteor.users.update(contId , { $set: { 'contacts.bids': newBids1 } });

        let oldCont1= oldDoc1[0].contacts.contacts;
        if(!oldCont1) oldCont1 = [];
        oldCont1.push(this.userId);
        Meteor.users.update(contId, { $set: { 'contacts.contacts': oldCont1 } });
       
        let oldDoc2 = Meteor.users.find({_id: this.userId }).fetch();

        let oldOffers2= oldDoc2[0].contacts.offers;
        let newOffers2 = _.without(oldOffers2, contId);
       Meteor.users.update(this.userId, { $set: { 'contacts.offers': newOffers2 } });

        let oldCont2= oldDoc2[0].contacts.contacts;
        if(!oldCont2) oldCont2 = [];
        oldCont2.push(contId);
        Meteor.users.update(this.userId, { $set: { 'contacts.contacts': oldCont2 } });
        return oldCont2
    }   

});    
