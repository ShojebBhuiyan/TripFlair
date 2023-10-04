export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/location",
    "/location/cox",
    "/location/bandarban",
    "/location/sunamganj",
    "/location/sylhet",
    "/custom-plan",
  ],
};
