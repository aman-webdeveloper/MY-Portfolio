declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

// Allow unknown HTML attributes like data-aos, data-testid
declare namespace JSX {
  interface IntrinsicElements {
    i: any;
  }
  interface IntrinsicAttributes {
    [key: string]: any;
  }
}
