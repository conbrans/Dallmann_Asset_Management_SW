public enum EntryErrors
{
    NEGATIVEID( "Negative ID"),
    IDISTOLONG( "ID is to big"),
    ONLYNUMBERSALLOWED( "Only Numbers are allowed"),
    ONLYTEXTALLOWED( "Only Text is allowed"),
    INCORRECTDATEFORMAT("Date format is incorrect"),
    CORRECTENTRY("ENTRY IS CORRECT");

    private final String entryErrorString;

    EntryErrors(String entryErrorString)
    {
        this.entryErrorString = entryErrorString;
    }


}
