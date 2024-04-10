import { useSelector } from "react-redux";

export   function formatTime(timeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(timeString).toLocaleDateString("en-US", options);
  }

  export function extractStars(stars: string): number {
    const match = stars.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  // export function getSignedInUserId():number{
  //   const authUserData = useSelector((state: any) => state.auth.userData)
  //   return authUserData? authUserData.id : 0
  // }