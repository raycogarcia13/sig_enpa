
exports.getUser = (user)=>{
    return ad.findUser(`${user}${process.env.LDAP_DOMAIN}`,function(err, data) {
        return data
    });

}

exports.groupsOfUser = (user)=>{
   return ad.getGroupMembershipForUser(`${user}${process.env.LDAP_DOMAIN}`, function(err, groups) {
        return groups
    });
}

exports.usersForGroup = (group)=>{
   return ad.getUsersForGroup(group, function(err, users) {
        return err?[]:users
    });

}