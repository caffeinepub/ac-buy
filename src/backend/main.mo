import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

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

  public shared ({ caller }) func getSubmission(id : Text) : async ?Submission {
    assertIsAuthenticated(caller);
    submissions.get(id);
  };

  public shared ({ caller }) func getAllSubmissions() : async [Submission] {
    assertIsAuthenticated(caller);
    submissions.values().toArray();
  };

  public shared ({ caller }) func getAllCustomerContacts() : async [(Text, Text, Text, Text)] {
    submissions.values().map(
      func(submission) {
        (submission.customerName, submission.phone, submission.email, submission.brand.concat(" ").concat(submission.model));
      }
    ).toArray();
  };

  func assertIsAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("You must be authenticated through Internet Identity to access this route. Please log in and try again.");
    };
  };
};
