import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ServicesSection() {
  return (
    <section className="bg-[#F2F6F6] bg-worldMap bg-cover bg-no-repeat py-20">
      <div className="container flex flex-col items-center justify-center gap-6 bg-worldMap bg-cover bg-no-repeat">
        <h2 className="text-3xl">Our Services</h2>
        <div className="mt-10 flex w-full justify-around">
          <Card className="w-[20rem]">
            <CardHeader>
              <CardTitle>
                <svg
                  width="46"
                  height="45"
                  viewBox="0 0 46 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3571 9.2C44.7929 9.2 45.2107 9.07884 45.5188 8.86317C45.8269 8.64751 46 8.355 46 8.05V2.3C46 1.69 45.6538 1.10499 45.0376 0.673654C44.4214 0.242321 43.5857 0 42.7143 0H3.28571C2.41429 0 1.57855 0.242321 0.962363 0.673654C0.346172 1.10499 0 1.69 0 2.3V8.05C0 8.355 0.173086 8.64751 0.481182 8.86317C0.789277 9.07884 1.20714 9.2 1.64286 9.2C2.51428 9.2 3.35002 9.44232 3.96621 9.87365C4.5824 10.305 4.92857 10.89 4.92857 11.5C4.92857 12.11 4.5824 12.695 3.96621 13.1263C3.35002 13.5577 2.51428 13.8 1.64286 13.8C1.20714 13.8 0.789277 13.9212 0.481182 14.1368C0.173086 14.3525 0 14.645 0 14.95V20.7C0 21.31 0.346172 21.895 0.962363 22.3263C1.57855 22.7577 2.41429 23 3.28571 23H42.7143C43.5857 23 44.4214 22.7577 45.0376 22.3263C45.6538 21.895 46 21.31 46 20.7V14.95C46 14.645 45.8269 14.3525 45.5188 14.1368C45.2107 13.9212 44.7929 13.8 44.3571 13.8C43.4857 13.8 42.65 13.5577 42.0338 13.1263C41.4176 12.695 41.0714 12.11 41.0714 11.5C41.0714 10.89 41.4176 10.305 42.0338 9.87365C42.65 9.44232 43.4857 9.2 44.3571 9.2ZM42.7143 15.9505V20.7H31.2143V17.25H27.9286V20.7H3.28571V15.9505C4.69199 15.6932 5.93673 15.1168 6.82512 14.3115C7.71351 13.5062 8.19542 12.5175 8.19542 11.5C8.19542 10.4825 7.71351 9.49378 6.82512 8.68848C5.93673 7.88318 4.69199 7.30679 3.28571 7.0495V2.3H27.9286V5.75H31.2143V2.3H42.7143V7.0495C41.308 7.30679 40.0633 7.88318 39.1749 8.68848C38.2865 9.49378 37.8046 10.4825 37.8046 11.5C37.8046 12.5175 38.2865 13.5062 39.1749 14.3115C40.0633 15.1168 41.308 15.6932 42.7143 15.9505Z"
                    fill="#32DF8F"
                  />
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">Ticket Booking</h2>
            </CardContent>
            <CardFooter>
              <h2 className="text-lg">
                We book all kind of national or international ticket for your
                destinaion.
              </h2>
            </CardFooter>
          </Card>
          <Card className="w-[20rem]">
            <CardHeader>
              <CardTitle>
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_6)">
                    <path
                      d="M11.9219 25.8125C12.3391 25.8125 12.7469 25.9362 13.0938 26.168C13.4407 26.3998 13.711 26.7292 13.8707 27.1147C14.0303 27.5001 14.0721 27.9242 13.9907 28.3334C13.9093 28.7426 13.7084 29.1184 13.4134 29.4134C13.1184 29.7084 12.7426 29.9093 12.3334 29.9907C11.9242 30.0721 11.5001 30.0303 11.1147 29.8707C10.7292 29.711 10.3998 29.4407 10.168 29.0938C9.93621 28.7469 9.8125 28.3391 9.8125 27.9219C9.8125 27.3624 10.0347 26.8259 10.4303 26.4303C10.8259 26.0347 11.3624 25.8125 11.9219 25.8125ZM11.9219 23C10.9484 23 9.99683 23.2887 9.18743 23.8295C8.37803 24.3703 7.74718 25.139 7.37466 26.0384C7.00213 26.9377 6.90466 27.9273 7.09457 28.8821C7.28449 29.8368 7.75325 30.7138 8.44159 31.4022C9.12992 32.0905 10.0069 32.5593 10.9617 32.7492C11.9164 32.9391 12.906 32.8416 13.8054 32.4691C14.7048 32.0966 15.4734 31.4657 16.0143 30.6563C16.5551 29.8469 16.8438 28.8953 16.8438 27.9219C16.8438 26.6165 16.3252 25.3646 15.4022 24.4416C14.4791 23.5186 13.2272 23 11.9219 23Z"
                      fill="#00B8E0"
                    />
                    <path
                      d="M35.3438 22.8713H24.0938C23.3478 22.8713 22.6325 23.1676 22.105 23.695C21.5776 24.2225 21.2812 24.9378 21.2812 25.6838V34.1213H5.8125V18.09L22.6875 9.00563L40.3078 18.4838L41.6297 16.0087L23.3484 6.165C23.145 6.05666 22.918 6 22.6875 6C22.457 6 22.23 6.05666 22.0266 6.165L3.74531 16.0087C3.52076 16.1283 3.33286 16.3066 3.20161 16.5245C3.07035 16.7424 3.00068 16.9919 3 17.2463V45.3713H5.8125V36.9338H39.5625V45.3713H42.375V29.9025C42.375 28.0377 41.6342 26.2493 40.3156 24.9307C38.997 23.612 37.2086 22.8713 35.3438 22.8713ZM24.0938 34.1213V25.6838H35.3438C36.4626 25.6838 37.5357 26.1282 38.3269 26.9194C39.118 27.7106 39.5625 28.7836 39.5625 29.9025V34.1213H24.0938Z"
                      fill="#00B8E0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_6">
                      <rect width="45" height="45" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">Hotel Booking</h2>
            </CardContent>
            <CardFooter>
              <h2 className="text-lg">
                You can easily book your according to your budget hotel by our
                website.
              </h2>
            </CardFooter>
          </Card>
          <Card className="w-[20rem]">
            <CardHeader>
              <CardTitle>
                <svg
                  width="36"
                  height="45"
                  viewBox="0 0 36 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.291 0.375547C35.0535 0.178385 34.7649 0.0527705 34.4588 0.0133424C34.1527 -0.0260857 33.8416 0.0222962 33.5619 0.15285L0 15.9061V18.9544L14.0967 24.593L23.1388 38.5042H26.1877L35.8211 2.03661C35.8992 1.73796 35.8909 1.42326 35.797 1.12918C35.7031 0.835097 35.5277 0.573737 35.291 0.375547ZM24.3053 35.5968L16.5332 23.6393L28.4931 10.5399L26.6008 8.81218L14.5472 22.0136L2.92445 17.3645L32.8291 3.32747L24.3053 35.5968Z"
                    fill="#E48B78"
                  />
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-semibold">Tour Plan</h2>
            </CardContent>
            <CardFooter>
              <h2 className="text-lg">
                We provide you the best plan within a short time explore more.
              </h2>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-10">
          <h1 className="text-center text-4xl">
            We always try to give you the best service
          </h1>
          <h3 className="mt-5 text-center text-lg">
            We always try to make our customer Happy. We provide all kinds of
          </h3>
          <h3 className="text-center text-lg">
            facilities. Your satisfaction is our main priority.
          </h3>
        </div>
      </div>
    </section>
  );
}
