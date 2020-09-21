package java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Rent
{
    private final int deviceId;
    private final int projectId;
    private final String username;
    private final String entryDate;
    private final String exitDate;
    private final Date dateEntryDate;
    private final Date dateExitDate;
    private long duration;
    final SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    /**
     * Constructor od java.Rent/Booking
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
        this.duration   = calcDuration(dateEntryDate,dateExitDate);
    }

    private long calcDuration(Date firstDay, Date lastDay)
    {
        return duration= (lastDay.getTime()-firstDay.getTime())/86400000;
    }

    /**
     * method to change from string to date
     * @param stringToChange
     * @return the date from the sql-String
     */
    private Date transformStringDateToRealDate(String stringToChange)
    {
        Date date = null;
        try
        {
            date = format.parse(stringToChange);
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * method which checks if an deviceId is already in rent
     * @param array deviceId from the database
     * @param v id which is compared to the deviceId in the database
     * @return true if the deviceId is already in the database / false if there is no entry for this deviceId
     */
    private static boolean contains(int[] array,int v) {

        boolean result = false;
        for(int i : array)
        {
            if(i == v)
            {
                result = true;
                break;
            }
        }
        return result;
    }

    private boolean checkSomething(Date firstDayOfRent, Date lastDayOfRent)
    {
        return dateEntryDate.after(firstDayOfRent) && dateEntryDate.before(lastDayOfRent);
    }

    /**
     * method to check if a rent is available for this time
     * @param data
     * @param firstDateOfRent
     * @param lastDateOfRent
     * Method needs to be transformed to work with SQL
     */
    public void bookDevice(int[] data, Date firstDateOfRent, Date lastDateOfRent)
    {
        String sqlstatement = "INSERT INTO Reservierung VALUES("+deviceId+","+projectId+","+username+","+entryDate+","+exitDate+");";
        if(!contains(data,deviceId))
        {
            System.out.println("Für dieses Gerät liegt noch keine Reservierung vor.");
            System.out.println(sqlstatement);

        }else
            {
                if (checkSomething(firstDateOfRent,lastDateOfRent))
                {
                    System.out.println("Dieses Gerät kann in diesem Zeitraum nicht reserviert werden, bitte wählen Sie ein anderes Gerät oder einen anderen Zeitraum.");
                }else
                    {
                        System.out.println("Dieses Gerät ist bereits für einen anderen Zeitraum reserviert, kann aber in diesem Zeitraum ausgeliehen werden.");
                        System.out.println(sqlstatement);
                    }
            }
    }




    public String deleteReservation()
    {
        return null;

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
