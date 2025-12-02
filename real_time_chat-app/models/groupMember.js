const GroupMember = sequelize.define("GroupMembers", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  