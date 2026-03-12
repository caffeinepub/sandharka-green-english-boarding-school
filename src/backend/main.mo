import List "mo:core/List";

actor {
  type Notice = {
    title : Text;
    content : Text;
    date : Text;
  };

  let notices = List.empty<Notice>();

  public shared ({ caller }) func addNotice(title : Text, content : Text, date : Text) : async () {
    let newNotice : Notice = { title; content; date };
    notices.add(newNotice);
  };

  public query ({ caller }) func getAllNotices() : async [Notice] {
    notices.toArray();
  };
};
