type UserAccessToken = {
  access_token: string;
  token_type: string;
};

type UserInfo = {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  is_tg_bot: boolean;
};
