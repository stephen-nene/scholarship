class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :middle_name, :username, :phonenumber, :email, :addresses, :role, :profile_pic, :status
end
