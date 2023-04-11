export interface CreateGroupDto {
  groupName: String
  clientId: String
}

export interface GroupInfoDto {
  groupId: String
  groupName: String
  isJoined: Boolean
}

export interface GroupClientIdDto {
  groupId: String
  clientId: String
}
