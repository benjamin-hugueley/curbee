/**
 * Represents a customer with personal contact details.
 */
export interface Customer {
  /** The first name of the customer. */
  firstName: string;
  
  /** The last name of the customer. */
  lastName: string;
  
  /** The phone number of the customer. */
  phone: number;
  
  /** The email address of the customer. */
  email: string;
}