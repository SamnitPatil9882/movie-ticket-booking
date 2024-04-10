import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Input, InputNumber, Rate, notification } from "antd";
import Header from "../Headers/header";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useGetMovieShowQuery } from "../../app/api/movieShows";
import { useGetMovieQuery } from "../../app/api/moviApi";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "reactstrap";
import { PaymentMode } from "./types";
import { useCreateTicketMutation } from "../../app/api/ticket";
import { TicketRequestBody } from "../../app/api/types";
import { useSelector } from "react-redux";
import { number } from "yup";
import { extractStars, formatTime } from "../../utils/helper";
const BookTicket = () => {
  const [api, contextHolder] = notification.useNotification();
  const { movieShowId } = useParams<{ movieShowId?: string }>();
  const [bookTicket, setBookTicket] = useState<Boolean>(false);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(
    PaymentMode.online
  );
  const [vipSeatCount, setVIPSeatCount] = useState<number>(0);
  const [premiumSeatCount, setPremiumSeatCount] = useState<number>(0);
  const [standardSeatCount, setStandardSeatCount] = useState<number>(0);
  const [availabel, setAvailabel] = useState<Boolean>(true);
  const [createTicket, { isLoading:ticketIsLoading, isSuccess:ticketIsSuccess, error:ticketError, data:ticketData }] =
    useCreateTicketMutation();
  const {
    data: movieShow,
    error: movieShowError,
    isLoading: movieShowLoading,
  } = useGetMovieShowQuery(movieShowId ? parseInt(movieShowId) : 1);

  const compareTime = (showTime: string): Boolean => {
    const showTimeDate = new Date(showTime);
    const currentTime = new Date();
    if (showTimeDate <= currentTime) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() =>{
    if(movieShow)
    setAvailabel(compareTime(movieShow?.show_start_time))

  },[movieShow])

  useEffect(()=>{

  },[ticketData,ticketError])

  useEffect(() => {
    // Reset seat counts to 0 after component mount
    setVIPSeatCount(0);
    setPremiumSeatCount(0);
    setStandardSeatCount(0);
  }, []);

  // Fetch data for the movie
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMovieQuery(movieShow ? movieShow.movie_id : 1);

  const userData = useSelector((state: any) => state.auth.userData);

  const seatTypeArray = Array.from({ length: vipSeatCount }, () => "vip")
  .concat(Array.from({ length: premiumSeatCount }, () => "premium"))
  .concat(Array.from({ length: standardSeatCount }, () => "standard"));
  const handleBookTicket = () => {
    if (movieShow) {
      const movieTicketReq: TicketRequestBody = {
        ticket: {
          payment_mode: paymentMode,
          seat_book: vipSeatCount + premiumSeatCount + standardSeatCount,
          user_id: userData.id,
          movie_show_id: movieShow?.id,
          seat_type:seatTypeArray,
        },
      };
      const ticketreqresp = createTicket(movieTicketReq).unwrap();
      console.log("ticketResponse; ", ticketreqresp);
    }
  };

  const navigate = useNavigate()
  useEffect(() => {
    if (ticketIsSuccess) {
      navigate("/my-tickets");
    } else if (ticketError) {
      let errorMessage = 'Unknown error';
      
      if ('base' in ticketError && Array.isArray(ticketError.base)) {
        errorMessage = ticketError.base[0]; // If error is from FetchBaseQueryError
      } else if ('message' in ticketError) {
        errorMessage = ticketError.message || 'Unknown error'; // If error is from SerializedError
      } else if (typeof ticketError === 'string') {
        errorMessage = ticketError; // If error is a string
      }
      
      api.open({
        message: 'Notification Title',
        description: errorMessage,
        duration: 0,
      });
    }
  }, [ticketData, ticketError, ticketIsSuccess]);
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="text-white flex items-center justify-center ">
        {contextHolder}
        {movie && movieShow && (
          <div>
            <div className="flex w-full justify-center">
              <div className="flex">
                <Card
                  className="m-5 "
                  hoverable
                  //   onClick={() => navigate(`/movie-info/${movieShow.id}`)}
                  style={{ width: 240 }}
                  cover={<img alt="example" src={movie.img_url} />}
                >
                  <Meta
                    title={movie?.title}
                    description={
                      <Rate
                        disabled
                        defaultValue={extractStars(movie?.stars)}
                      />
                    }
                  />
                </Card>
              </div>
              <div className="w-1/2 bg-white h-full">
                <div className="bg-gray-800 text-white p-4 ">
                  <div className="font-bold text-xl mb-4">
                    Movie Show Information
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="text-lg font-bold">ID:</div>
                      <div className="text-lg">{movieShow.id}</div>

                      <div className="text-lg font-bold">Language:</div>
                      <div className="text-lg">{movieShow.language}</div>

                      <div className="text-lg font-bold">Screen No:</div>
                      <div className="text-lg">{movieShow.screen_no}</div>

                      <div className="text-lg font-bold">Seat Count:</div>
                      <div className="text-lg">{movieShow.seat_count}</div>

                      <div className="text-lg font-bold">Show Start Time:</div>
                      <div className="text-lg">
                        {formatTime(movieShow.show_start_time)}
                      </div>

                      <div className="text-lg font-bold">Show End Time:</div>
                      <div className="text-lg">
                        {formatTime(movieShow.show_end_time)}
                      </div>

                      <div className="text-lg font-bold">Seat Type:</div>
                      <div className="text-lg">
                        <div className="text-white">
                          <div className="flex">
                            <div className="w-1/3 font-bold">Type</div>
                            <div className="w-1/3 font-bold">Price</div>
                            <div className="w-1/3 font-bold">Count</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">VIP</div>
                            <div className="w-1/3">
                              {movieShow.seat_type_price.vip}
                            </div>
                            <div className="w-1/3">
                              {movieShow.seat_type_count.vip}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">Premium</div>
                            <div className="w-1/3">
                              {movieShow.seat_type_price.premium}
                            </div>
                            <div className="w-1/3">
                              {movieShow.seat_type_count.premium}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3">Standard</div>
                            <div className="w-1/3">
                              {movieShow.seat_type_price.standard}
                            </div>
                            <div className="w-1/3">
                              {movieShow.seat_type_count.standard}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    {availabel && (
                      <Button
                        onClick={() => setBookTicket((prev) => !prev)}
                        className="flex items-center justify-center bg-white text-2xl p-2"
                      >
                        {bookTicket ? "Cancel booking.." : "Book Now"}
                      </Button>
                    )}
                    {!availabel && (
                      <div className="text-red-500 font-bold text-xl">
                        Movie show is not available
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="flex flex-col bg-gray-800">
                  <div>
                  <div className="text-lg font-bold flex justify-center">Seat Count:</div>
                    <div className="text-lg flex justify-center">
                      <div className="m-5">
                      <div>VIP</div>
                      <InputNumber
                      max={movieShow.seat_type_count.vip}
                        min={0}
                        defaultValue={0}
                        // onChange={handleSeatCountChange}
                      />
                      </div>
                      <div className="m-5">
                      <div>PREMIUM</div>
                      <InputNumber
                        max={movieShow.seat_type_count.premium}
                        min={0}
                        defaultValue={0}
                        // onChange={handleSeatCountChange}
                      />
                      </div>
                      <div className="m-5">
                      <div>STANDARD</div>
                      <InputNumber
                      max={movieShow.seat_type_count.standard}
                        min={0}
                        defaultValue={0}
                        // onChange={handleSeatCountChange}
                      />
                      </div>
                    </div>
                  </div>
              </div> */}
              </div>
            </div>
            {availabel && bookTicket && (
              <div>
                <div>
                  <div className="flex flex-col bg-gray-800">
                    <div>
                      <div className="text-2xl font-bold flex justify-center ">
                        Seat Count:
                      </div>
                      <div className="text-lg flex justify-center">
                        <div className="m-5">
                          <div>VIP</div>
                          <InputNumber
                            max={movieShow.seat_type_count.vip}
                            min={0}
                            defaultValue={0}
                            onChange={(e) => setVIPSeatCount(e as number)}
                          />
                        </div>
                        <div className="m-5">
                          <div>PREMIUM</div>
                          <InputNumber
                            max={movieShow.seat_type_count.premium}
                            min={0}
                            defaultValue={0}
                            onChange={(e) => setPremiumSeatCount(e as number)}
                          />
                        </div>
                        <div className="m-5">
                          <div>STANDARD</div>
                          <InputNumber
                            max={movieShow.seat_type_count.standard}
                            min={0}
                            defaultValue={0}
                            onChange={(e) => setStandardSeatCount(e as number)}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl">Payment Mode: </div>
                        <div className="flex items-center justify-center">
                          <div className="flex m-5">
                            <Input
                              type="radio"
                              id="paymentModeCash"
                              name="paymentMode"
                              value={paymentMode}
                              checked={paymentMode === PaymentMode.cash}
                              // onBlur={handleFieldBlur}
                              onChange={() => {
                                paymentMode === PaymentMode.cash
                                  ? setPaymentMode(PaymentMode.online)
                                  : setPaymentMode(PaymentMode.cash);
                                console.log("cash radio");
                              }}
                            />
                            <Label
                              htmlFor="user"
                              className="text-white ml-2 text-xl"
                            >
                              Cash
                            </Label>
                          </div>
                          <div className="flex m-5">
                            <Input
                              type="radio"
                              id="paymentModeOnline"
                              name="role"
                              value={paymentMode}
                              checked={paymentMode === PaymentMode.online}
                              // onBlur={handleFieldBlur}
                              onChange={() => {
                                paymentMode === PaymentMode.online
                                  ? setPaymentMode(PaymentMode.cash)
                                  : setPaymentMode(PaymentMode.online);
                                console.log("online radio");
                              }}
                            />
                            <Label
                              htmlFor="user"
                              className="text-white ml-2 text-xl"
                            >
                              Online
                            </Label>
                          </div>
                        </div>
                        <div>
                          <div className="text-white text-xl">
                            Total Amount:
                          </div>
                          <div>
                            {movieShow.seat_type_price.vip * vipSeatCount +
                              movieShow.seat_type_price.premium *
                                premiumSeatCount +
                              movieShow.seat_type_price.standard *
                                standardSeatCount}
                          </div>
                        </div>
                        <div>
                          <Button
                            onClick={handleBookTicket}
                            className="text-xl bg-white"
                          >
                            Book Ticket
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
