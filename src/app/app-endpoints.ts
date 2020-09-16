export class AppEndpoints {
  static ADMINS_DB = '/admins/db';
  // localhost:8080/pictures 返回所有图片信息
  static PICTURES = '/pictures';
  // 存储图片信息，但不能上传图片
  static PICTURES_SAVE = '/pictures/save';
  // 传图片
  static PICTURES_ADD_FILE = '/pictures/addfile';
  // 仅仅返回图片
  static PICTURES_PHOTO = '/picturesphoto';
  // 根据id返回图片信息
  static PICTURES_ID = '/pictures/id'
  // 根据owner返回全部图片信息
  static PICTURES_OWNER = '/pictures/owner'
  // 删除图片
  static PICTURES_DELETE = '/pictures/delete'
  // put更新图片
  static PICTURES_UPDATE = '/pictures/update'

  static TEMPERATURE_ALL = '/temperature/all'
  static TEMPERATURE_DELETE = '/temperature/delete'

  static SYSTEM_APP_INFO = '/system/app-info';

  static USERS = '/users';
  static USERS_ALL = '/users/all';
  static USER_PASSWORD = '/users/password';
}
