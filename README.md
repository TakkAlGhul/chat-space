# Chat Space

  This is a Chat application.


## Database Construction

### Users Table

| column | Type | Options |
|:------:|:----:|:-------:|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false |

#### Association
- has_many :messages
- has_many :groups, through: members
- has_many :members


### Groups Table

| column | Type | Options |
|:------:|:----:|:-------:|
|name|string|null: false|

#### Association
- has_many :mesasges
- has_many :users, through: members
- has_many :members


### Members Table
| column | Type | Options |
|:------:|:----:|:-------:|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user


### Messages Table
| column | Type | Options |
|:------:|:----:|:-------:|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

