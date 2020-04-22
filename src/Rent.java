import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Rent
{
    private int deviceId;
    private int projectId;
    private String username;
    private String entryDate;
    private String exitDate;
    private Date dateEntryDate;
    private Date dateExitDate;
    private long duration;
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");


    /**
     * Constructor od Rent/Booking
     * @param deviceId
     * @param projectId
     * @param username
     * @param entryDate
     * @param exitDate
     * @throws ParseException
     */
    public Rent(int deviceId,int projectId, String username,String entryDate, String exitDate){
        this.deviceId   = deviceId;
        this.projectId  = projectId;
        this.username   = username;
        this.entryDate  = entryDate;
        this.exitDate   = exitDate;
        dateEntryDate   = transformStringDateToRealDate(entryDate);
        dateExitDate    = transformStringDateToRealDate(exitDate);
        this.duration   = (dateExitDate.getTime()-dateEntryDate.getTime())/86400000; //Calculation to get the rentduration in days 24*60*60*1000
    }


    /**
     *
     * @param stringToChange
     * @return the date from the sql-String
     */
    private Date transformStringDateToRealDate(String stringToChange)
    {
        Date date = null;
        try
        {
            date = format.parse(stringToChange);
            System.out.println(date);
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return date;
    }

    public String bookDevice() //TODO
    {
        String sqlStatement= "INSERT INTO ";
        return sqlStatement;
    }

    public String deleteReservation() //TODO
    {

    }

    public int getDeviceId() {
        return deviceId;
    }

    public int getProjectId() {
        return projectId;
    }

    public String getUsername() {
        return username;
    }

    public Date getDateEntryDate() {
        return dateEntryDate;
    }

    public Date getDateExitDate() {
        return dateExitDate;
    }

    public long getDuration() {
        return duration;
    }





}
