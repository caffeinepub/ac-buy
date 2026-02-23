import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";



actor {
  type Condition = {
    #new;
    #excellent;
    #good;
    #average;
    #poor;
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

  type SubmissionResult = {
    #success : Text;
    #error : Text;
  };

  public shared ({ caller }) func submitAC(
    brand : Text,
    model : Text,
    age : Nat,
    condition : Condition,
    customerName : Text,
    phone : Text,
    email : Text,
  ) : async SubmissionResult {
    // Validate inputs
    if (brand == "" or model == "") {
      return #error("Brand and model must not be empty");
    };

    if (age > 100) {
      return #error("Age appears invalid. Please check your input");
    };

    if (customerName == "" or phone == "") {
      return #error("Must provide all required customer details (name & phone number)");
    };

    // Check for duplicates based on brand, model, and customer
    let submissionKey = brand.concat(model).concat(customerName);
    if (submissions.get(submissionKey) != null) {
      return #error("AC has already been submitted with these details. Please check your inputs");
    };

    // Create and store new submission
    let newSubmission : Submission = {
      brand;
      model;
      age;
      condition;
      customerName;
      phone;
      email;
      timestamp = Time.now();
    };

    submissions.add(submissionKey, newSubmission);
    #success("Validated submission received, successfully stored entry.");
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
    assertIsAuthenticated(caller);
    submissions.values().map(
      func(submission) {
        (submission.customerName, submission.phone, submission.email, submission.brand.concat(" ").concat(submission.model));
      }
    ).toArray();
  };

  func assertIsAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap(
        "You must be authenticated through Internet Identity to access this route. Please log in and try again.",
      );
    };
  };
};
