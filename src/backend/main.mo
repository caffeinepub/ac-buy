import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";

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
      let validationError = "Brand and model must not be empty";
      Debug.print("Validation failed: " # validationError);
      return #error(validationError);
    };

    if (age > 100) {
      let validationError = "Age appears invalid (greater than 100). Please check your input";
      Debug.print("Validation failed: " # validationError);
      return #error(validationError);
    };

    if (customerName == "" or phone == "") {
      let validationError = "Must provide all required customer details (name & phone number)";
      Debug.print("Validation failed: " # validationError);
      return #error(validationError);
    };

    let submissionKey = brand.concat(model).concat(customerName);
    if (submissions.get(submissionKey) != null) {
      let duplicateError = "AC has already been submitted with these details (brand, model, customer). Please check your inputs";
      Debug.print("Duplicate submission attempt: " # duplicateError);
      return #error(duplicateError);
    };

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
    let successMsg = "Validated submission received and successfully stored with key " # submissionKey;
    Debug.print("Submission stored successfully: " # successMsg);

    #success(successMsg);
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
    let contacts = submissions.values().map(
      func(submission) {
        (submission.customerName, submission.phone, submission.email, submission.brand.concat(" ").concat(submission.model));
      }
    ).toArray();
    contacts;
  };

  func assertIsAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap(
        "You must be authenticated through Internet Identity to access this route. Please log in and try again.",
      );
    } else {
      Debug.print("Authenticated principal: " # debug_show (caller));
    };
  };
};
