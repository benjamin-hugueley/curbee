import { Customer } from './customer'
import { Location } from './location'
import { Vehicle } from './vehicle'

export interface Appointment {
  appointmentDateTime: Date;
  customer: Customer;
  location: Location;
  vehicle: Vehicle;
  appointmentDuration: number;
}

export interface AppointmentHours {
  start: number;
  end: number;
}