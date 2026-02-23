import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type Condition = {
    description : Text;
  };

  type Submission = {
    brand : Text;
    model : Text;
    age : Nat;
    condition : Condition;
    customerName : Text;
    phone : Text;
    email : Text;
    timestamp : Time.Time;
  };

  let submissions = Map.empty<Text, Submission>();

  public shared ({ caller }) func submitAirConditioner(
    brand : Text,
    model : Text,
    age : Nat,
    condition : Condition,
    customerName : Text,
    phone : Text,
    email : Text,
  ) : async Bool {
    let id = brand.concat(model).concat(Time.now().toText());
    let submission : Submission = {
      brand;
      model;
      age;
      condition;
      customerName;
      phone;
      email;
      timestamp = Time.now();
    };
    submissions.add(id, submission);
    true;
  };

  public query ({ caller }) func getSubmission(id : Text) : async ?Submission {
    submissions.get(id);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray();
  };
};
